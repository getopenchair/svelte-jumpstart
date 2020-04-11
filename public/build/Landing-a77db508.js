
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, e as element, t as text, b as add_location, c as insert_dev, f as append_dev, l as listen_dev, g as set_data_dev, n as noop, h as detach_dev } from './main-2ae8e3a1.js';

/* src/Landing.svelte generated by Svelte v3.20.1 */

const file = "src/Landing.svelte";

function create_fragment(ctx) {
	let button;
	let t0;
	let t1;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			t0 = text("Count is ");
			t1 = text(/*count*/ ctx[0]);
			add_location(button, file, 8, 0, 85);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, button, anchor);
			append_dev(button, t0);
			append_dev(button, t1);
			if (remount) dispose();
			dispose = listen_dev(button, "click", /*handleClick*/ ctx[1], false, false, false);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*count*/ 1) set_data_dev(t1, /*count*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			dispose();
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

function instance($$self, $$props, $$invalidate) {
	let count = 0;

	function handleClick() {
		$$invalidate(0, count += 1);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Landing> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Landing", $$slots, []);
	$$self.$capture_state = () => ({ count, handleClick });

	$$self.$inject_state = $$props => {
		if ("count" in $$props) $$invalidate(0, count = $$props.count);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [count, handleClick];
}

class Landing extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Landing",
			options,
			id: create_fragment.name
		});
	}
}

export default Landing;
//# sourceMappingURL=Landing-a77db508.js.map