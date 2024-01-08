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
		let q = GSAP.utils.selector(this.element);

		if (prefersReduced.matches) {
			timeline.from(q("figure"), {
				autoAlpha: 0,
				ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
			});
		} else {
			timeline.from(q("figure"), {
				yPercent: 10,
				stagger: 0.05,
				autoAlpha: 0,
				ease: CustomEase.create("custom", "0.68, -0.55, 0.265, 1.55"),
			});
		}
	}

	animateOut() {}
}
