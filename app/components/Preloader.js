import each from "lodash/each";
import GSAP from "gsap";
import Component from "classes/Component";

export default class Preloader extends Component {
	constructor() {
		super({
			element: ".preloader",
			elements: {
				progress: ".preloader__progress",
				images: document.querySelectorAll("img"),
			},
		});

		this.length = 0;

		this.createLoader();
	}

	createLoader() {
		each(this.elements.get("images"), (element) => {
			element.onload = (_) => this.onAssetLoaded(element);
			element.src = element.getAttribute("data-src");
		});
	}

	onAssetLoaded(image) {
		this.length += 1;
		const percent = this.length / this.elements.get("images").length;

		this.elements.get("progress").innerHTML = Math.round(percent * 100) + "%";

		if (percent === 1) {
			this.onLoaded();
		}
	}

	onLoaded() {
		return new Promise((resolve) => {
			this.animateOut = GSAP.timeline({
				delay: 1.5,
			});

			this.animateOut.to(this.element, {
				autoAlpha: 0,
				duration: 1,
				ease: "power2.inOut",
				onComplete: resolve,
			});

			this.animateOut.call((_) => this.emit("completed"));
		});
	}

	destroy() {
		this.element.parentNode.removeChild(this.element);
	}
}
