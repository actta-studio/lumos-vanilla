import Component from "classes/Component";

export default class AsyncLoad extends Component {
	constructor({ element }) {
		super({ element });
		this.createObserver();
	}

	createObserver() {
		this.observer = new window.IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				// if entry is intersecting or already in viewport
				if (entry.isIntersecting || entry.intersectionRatio > 0) {
					if (!this.element.src) {
						this.element.src = this.element.getAttribute("data-src");
						this.element.onload = (_) => {
							this.element.classList.add("loaded");
						};
					}
				}
			});
		});

		this.observer.observe(this.element);
	}
}
