
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, e as element, b as add_location, c as insert_dev, f as append_dev, n as noop, g as detach_dev } from './main-a51ff1b5.js';

/* src/PrivacyPolicy.svelte generated by Svelte v3.20.1 */

const file = "src/PrivacyPolicy.svelte";

function create_fragment(ctx) {
	let main;
	let p;

	const block = {
		c: function create() {
			main = element("main");
			p = element("p");
			p.textContent = "Privacy Policy";
			add_location(p, file, 1, 2, 9);
			add_location(main, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);
			append_dev(main, p);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(main);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PrivacyPolicy> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("PrivacyPolicy", $$slots, []);
	return [];
}

class PrivacyPolicy extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PrivacyPolicy",
			options,
			id: create_fragment.name
		});
	}
}

export default PrivacyPolicy;
//# sourceMappingURL=PrivacyPolicy-1466078d.js.map
