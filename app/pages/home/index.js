import Page from "classes/Page";
import Slider from "components/Slider";
import Button from "classes/Button";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { each, map } from "lodash";
import Indents from "animations/Indents";
import Images from "animations/Images";

export default class Home extends Page {
	constructor({ lenis }) {
		super({
			id: "home",
			element: ".home",
			elements: {
				header: document.querySelector(".navigation--header"),
				links: ".a--link",
				animatedIndents: "[data-animation='indents']",
				animatedImages: "[data-animation='images']",
			},
		});

		this.lenis = lenis;
	}

	show() {
		super.show();

		if (this.sourcePreloader) {
			this.timeline = gsap.timeline();

			// this.timeline
			// 	.from(".home .logo path", {
			// 		scaleY: 0,
			// 		ease: CustomEase.create("custom", "0.37, 0, 0.63, 1"),
			// 		delay: 1,
			// 		stagger: 0.05,
			// 	})
			// 	.from(".home [data-animation='fade-in']", {
			// 		autoAlpha: 0,
			// 	});

			this.timeline.call(() => {
				this.lenis.start();
			});
		} else {
			this.lenis.start();
		}
	}

	create({ sourcePreloader }) {
		super.create();
		this.createAnimations();
		this.sourcePreloader = sourcePreloader;
		this.addEventListeners();
	}

	createAnimations() {
		this.slider = new Slider({ lenis: this.lenis });

		this.animatedProducts = map(
			this.elements.get("animatedProducts"),
			(element) => {
				const rect = element.getBoundingClientRect();

				if (
					rect.top <=
						(window.innerHeight || document.documentElement.clientHeight) &&
					rect.bottom >= 0
				) {
					GSAP.from(element, {
						autoAlpha: 0,
						yPercent: 30,
						ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
					});
					return;
				} else {
					return new Products({
						element,
					});
				}
			}
		);

		this.animatedIndents = map(
			this.elements.get("animatedIndents"),
			(element) => {
				const rect = element.getBoundingClientRect();

				let indent = new Indents({ element });

				if (
					rect.top <=
						(window.innerHeight || document.documentElement.clientHeight) &&
					rect.bottom >= 0
				) {
					indent.animateIn();
				} else {
					return;
				}
			}
		);

		this.animatedImages = map(
			this.elements.get("animatedImages"),
			(element) => {
				return new Images({ element });
			}
		);
	}

	addEventListeners() {}

	removeEventListeners() {}

	destroy() {
		this.slider.destroy();
		super.destroy();
	}
}
