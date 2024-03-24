import GSAP from "gsap";
import Animation from "classes/Animation";

import ScrollTrigger from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

export default class Products extends Animation {
	constructor({ element, elements }) {
		super({ element, elements });
	}

	animateIn() {
		GSAP.from(this.element, {
			autoAlpha: 0,
			yPercent: 100,
			ease: CustomEase.create("custom", "0.34, 1.56, 0.64, 1"),
		});
	}

	animateOut() {}

	refresh() {
		return;
	}

	addEventListeners() {
		window.addEventListener("resize", this.refresh);
	}
}
