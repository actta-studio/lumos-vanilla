import GSAP from "gsap";
import Animation from "classes/Animation";
import { CustomEase } from "gsap/all";

GSAP.registerPlugin(CustomEase);

export default class Images extends Animation {
	constructor({ element, elements }) {
		super({ element, elements });
	}

	animateIn() {
		let timeline = GSAP.timeline();

		let prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

		if (prefersReduced.matches) {
			timeline.from(this.element, {
				autoAlpha: 0,
				ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
			});
		} else {
			timeline.from(this.element, {
				yPercent: 10,
				autoAlpha: 0,
				ease: CustomEase.create("custom", "0.68, -0.55, 0.265, 1.55"),
			});
		}
	}

	animateOut() {}
}
