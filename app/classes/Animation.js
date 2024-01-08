import Component from "classes/Component";

export default class Animation extends Component {
	constructor({ element, elements }) {
		super({ element, elements });

		this.createObserver();
		this.animateOut();
	}

	createObserver() {
		this.observer = new window.IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log("intersecting");
					this.animateIn();
					this.observer.unobserve(this.element);
				} else {
					console.log("not intersecting");
				}
			});
		});

		this.observer.observe(this.element);
	}

	animateIn() {
		throw new Error("animateIn method needs to be implemented");
	}

	animateOut() {
		throw new Error("animateOut method needs to be implemented");
	}
}
