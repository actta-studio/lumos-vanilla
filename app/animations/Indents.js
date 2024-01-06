import GSAP from "gsap";
import Animation from "classes/Animation";
import { CustomEase } from "gsap/all";

export default class Indents extends Animation {
	constructor({ element, elements }) {
		super({ element, elements });
		this.lines;
	}

	animateIn() {
		let mm = GSAP.matchMedia();

		mm.add(
			{
				isPhone: "(max-width: 430px)",
				isTablet: "(min-width: 431px) and (max-width: 768px)",
				isDesktop: "(min-width: 769px)",
				reduceMotion: "(prefers-reduced-motion: reduce)",
			},
			(context) => {
				let { isDesktop, isTablet, isPhone, reduceMotion } = context.conditions;
				let indents = GSAP.timeline();

				let selectorMap = new Map();

				selectorMap.set("isDesktop", "p:nth-of-type(1) span");
				selectorMap.set("isTablet", "p:nth-of-type(2) span");
				selectorMap.set("isPhone", "p:nth-of-type(3) span");

				this.lines = Array.from(
					this.element.querySelectorAll(
						selectorMap.get(
							(isDesktop && "isDesktop") ||
								(isTablet && "isTablet") ||
								(isPhone && "isPhone")
						)
					)
				);

				indents.from(this.lines, {
					xPercent: -5,
					stagger: 0.1,
					autoAlpha: 0,
					transformOrigin: "50% 50%",
					ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
				});
			}
		);
	}

	animateOut() {}
}
