import GSAP from "gsap";
import Animation from "classes/Animation";

import ScrollTrigger from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

export default class Images extends Animation {
	constructor({ element, elements }) {
		super({ element, elements, threshold: 0.4 });
	}

	animateIn() {
		this.timeline = GSAP.timeline();

		this.timeline.from(this.element, {
			yPercent: 20,
			autoAlpha: 0,
			ease: CustomEase.create("custom", "0.34, 1.56, 0.64, 1"),
		});
	}

	animateOut() {}

	addEventListeners() {}
}
