import { each, map } from "lodash";
import GSAP from "gsap";
import Lenis from "@studio-freight/lenis";

import Indents from "animations/Indents";

export default class Page {
	constructor({ id, element, elements }) {
		this.id = id;
		this.selector = element;
		this.selectorChildren = {
			...elements,
			animatedIndents: "[data-animation='indents']",
		};

		this.lenis = new Lenis({
			// duration: 1.2,
			easing: (x) =>
				x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
		});
	}

	create() {
		this.element = document.querySelector(this.selector);
		this.elements = new Map();

		each(this.selectorChildren, (selector, key) => {
			if (
				selector instanceof window.HTMLElement ||
				selector instanceof window.NodeList
			) {
				this.elements.set(key, selector);
			} else if (Array.isArray(selector)) {
				this.elements.set(key, selector);
			} else {
				this.elements.set(key, document.querySelectorAll(selector));

				if (this.elements.get(key).length === 0) {
					this.elements.set(key, null);
				} else if (this.elements.get(key).length === 1) {
					this.elements.set(key, document.querySelector(selector));
				}
			}
		});

		this.createAnimations();
	}

	createAnimations() {
		// console.log(this.elements.get("animatedIndents"));

		this.animatedIndents = map(
			this.elements.get("animatedIndents"),
			(element) => {
				return new Indents({
					element,
				});
			}
		);

		// console.log(this.animatedIndents);
	}

	show() {
		window.scrollTo(0, 0);

		return new Promise((resolve) => {
			this.animateIn = GSAP.timeline();

			this.animateIn.to(this.element, {
				autoAlpha: 1,
			});

			this.animateIn.call((_) => {
				this.initLenis();
				resolve();
			});
		});
	}

	hide() {
		return new Promise((resolve) => {
			this.animateOut = GSAP.timeline();

			this.animateOut.to(this.element, {
				autoAlpha: 0,
			});

			this.animateOut.call((_) => {
				resolve();
			});
		});
	}

	raf(time) {
		this.lenis.raf(time);
		requestAnimationFrame(this.raf.bind(this));
	}

	initLenis() {
		this.lenis.on("scroll", (e) => {});
		requestAnimationFrame(this.raf.bind(this));
	}
}
