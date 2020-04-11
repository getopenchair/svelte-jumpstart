<script context="module">
  import { register } from "svelte-loadable";

  const Landing = register({
    loader: () => import("./Landing.svelte"),
    resolve: () => import("./Landing.svelte")
  });
  const TermsOfService = register({
    loader: () => import("./TermsOfService.svelte"),
    resolve: () => import("./TermsOfService.svelte")
  });
  const PrivacyPolicy = register({
    loader: () => import("./PrivacyPolicy.svelte"),
    resolve: () => import("./PrivacyPolicy.svelte")
  });
</script>

<script>
  import { Router, Link, Route } from "svelte-routing";
  import Loadable from "svelte-loadable";

  export let url = "";
</script>

<style>
  .Site-content {
    flex: 1;
  }
</style>

<Router {url}>
  <div class="Site-content">
    <Route path="/privacy-policy" let:params>
      <Loadable loader={PrivacyPolicy} />
    </Route>
    <Route path="/terms-of-service" let:params>
      <Loadable loader={TermsOfService} />
    </Route>
    <Route path="/">
      <Loadable loader={Landing} />
    </Route>
  </div>
  <div class="Footer">
    <p>Footer</p>
  </div>
</Router>
