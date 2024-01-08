import { each, map } from "lodash";
import GSAP from "gsap";
import Lenis from "@studio-freight/lenis";

import Indents from "animations/Indents";
import Images from "animations/Images";

export default class Page {
	constructor({ id, element, elements }) {
		this.id = id;
		this.selector = element;
		this.selectorChildren = {
			...elements,
			animatedIndents: "[data-animation='indents']",
			animatedImages: "[data-animation='images']",
		};

		this.PARAMS = {
			easingFunction:
				"x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2",
		};
	}

	raf(time) {
		this.lenis.raf(time);
		requestAnimationFrame(this.raf);
	}

	initLenis() {
		this.lenis = new Lenis({
			easing: new Function("x", `return ${this.PARAMS.easingFunction}`),
		});

		this.raf = this.raf.bind(this);
		requestAnimationFrame(this.raf);

		this.lenis.scrollTo(0, {
			immediate: true,
		});
	}

	destroy() {
		this.lenis.scrollTo(0, {
			immediate: true,
		});
		this.lenis.destroy();
	}

	create() {
		this.initLenis();
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

	assignImages() {
		this.images = Array.from(this.element.querySelectorAll("img"));

		each(this.images, (image) => {
			image.src = image.getAttribute("data-src");
		});
	}

	createAnimations() {
		this.animatedIndents = map(
			this.elements.get("animatedIndents"),
			(element) => {
				return new Indents({
					element,
				});
			}
		);

		this.animatedImages = map(
			this.elements.get("animatedImages"),
			(element) => {
				return new Images({
					element,
				});
			}
		);
	}

	show() {
		return new Promise((resolve) => {
			this.animateIn = GSAP.timeline();

			this.animateIn.to(this.element, {
				autoAlpha: 1,
			});

			this.animateIn.call((_) => {
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
				this.destroy();
				resolve();
			});
		});
	}
}
