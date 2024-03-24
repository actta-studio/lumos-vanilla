import Component from "classes/Component";
import gsap from "gsap";

export default class Transition extends Component {
	constructor() {
		super({
			element: ".page-transition",
			elements: {
				paths: ".page-transition svg path",
			},
		});
	}

	animateIn() {
		this.timeline = gsap.timeline();

		return new Promise((resolve) => {
			this.timeline
				.set(this.element, {
					autoAlpha: 1,
				})
				.to(this.element, {
					scaleY: 1,
					duration: 0.5,
					transformOrigin: "bottom",
					onComplete: resolve,
				});
		});
	}

	animateOut() {
		this.timeline = gsap.timeline();

		return new Promise((resolve) => {
			this.timeline
				.to(this.element, {
					scaleY: 0,
					duration: 0.5,
					transformOrigin: "top",
				})
				.set(this.element, {
					autoAlpha: 0,
					onComplete: resolve,
				});
		});
	}
}
