provider "aws" {
  version = "~> 2.0"
  region = "us-east-1"
}

variable "stack_name" {
  type = string
  default = "werace"
}

variable "domain_name" {
  type = string
  default = "werace.app"
}

data "aws_region" "current" {}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.stack_name
  acl = "private"
}

resource "aws_route53_zone" "zone" {
  name = var.domain_name
}

resource "aws_acm_certificate" "cert" {
  domain_name = "*.${var.domain_name}"
  subject_alternative_names = ["${var.domain_name}"]
  validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation" {
  name = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
  type = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
  zone_id = aws_route53_zone.zone.id
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = aws_s3_bucket.s3_bucket.id
}

data "aws_iam_policy_document" "s3_bucket_policy_document" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
    resources = ["${aws_s3_bucket.s3_bucket.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
  bucket = aws_s3_bucket.s3_bucket.id
  policy = data.aws_iam_policy_document.s3_bucket_policy_document.json
}

resource "aws_cloudfront_distribution" "cdn" {
  aliases = ["*.${var.domain_name}", "${var.domain_name}"]
  default_root_object = "index.html"
  enabled = true

  origin {
    domain_name = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
    origin_id   = "primary"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "primary"
    compress = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.id
    ssl_support_method = "sni-only"
  }

  depends_on = [
    aws_s3_bucket.s3_bucket,
    aws_cloudfront_origin_access_identity.origin_access_identity,
    aws_acm_certificate_validation.cert
  ]
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.zone.zone_id
  name = var.domain_name
  type = "A"

  alias {
    name = aws_cloudfront_distribution.cdn.domain_name
    zone_id = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.zone.zone_id
  name = "www"
  type = "CNAME"
  ttl = "5"

  records        = ["${var.domain_name}"]
}