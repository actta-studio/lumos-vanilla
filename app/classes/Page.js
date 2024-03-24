import { each, map } from "lodash";
import GSAP from "gsap";
import Lenis from "@studio-freight/lenis";

import Indents from "animations/Indents";
import Images from "animations/Images";
import Products from "animations/Products";

import AsyncLoad from "classes/AsyncLoad";

export default class Page {
	constructor({ id, element, elements }) {
		this.id = id;
		this.selector = element;
		this.selectorChildren = {
			...elements,
			animatedIndents: "[data-animation='indents']",
			animatedImages: "[data-animation='images']",
			animatedProducts: "[data-animation='products']",
			asyncImages: "[data-src]",
		};
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

		this.loadImages();
	}

	loadImages() {
		if (this.elements.get("asyncImages") instanceof window.HTMLImageElement) {
			return new AsyncLoad({ element: this.elements.get("asyncImages") });
		} else {
			this.preloaders = map(this.elements.get("asyncImages"), (element) => {
				return new AsyncLoad({ element });
			});
		}
	}

	// createAnimations() {
	// 	// this.animatedIndents = map(
	// 	// 	this.elements.get("animatedIndents"),
	// 	// 	(element) => {
	// 	// 		return new Indents({
	// 	// 			element,
	// 	// 		});
	// 	// 	}
	// 	// );

	// 	this.animatedImages = map(
	// 		this.elements.get("animatedImages"),
	// 		(element) => {
	// 			return new Images({
	// 				element,
	// 			});
	// 		}
	// 	);

	// 	this.animatedProducts = map(
	// 		this.elements.get("animatedProducts"),
	// 		(element) => {
	// 			return new Products({
	// 				element,
	// 			});
	// 		}
	// 	);
	// }

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

	destroy() {
		// console.log("destroying page", this.id);
	}
}
