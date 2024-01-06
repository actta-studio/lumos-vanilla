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

		const clampedPercent = Math.max(0, Math.min(percent * 100, 100));

		this.elements.get("progress").innerHTML = Math.round(clampedPercent) + "%";

		if (percent === 1) {
			this.onLoaded();
		}
	}

	onLoaded() {
		return new Promise((resolve) => {
			this.animateOut = GSAP.timeline({
				delay: 1.5,
			});

			this.animateOut.to(this.elements.get("progress"), {
				yPercent: 100,
				duration: 0.75,
				ease: "expo.out",
				onComplete: resolve,
			});
			// .to(this.element, {
			// 	autoAlpha: 0,
			// 	duration: 1,
			// 	ease: "power2.inOut",
			// });

			this.animateOut.call((_) => this.emit("completed"));
		});
	}

	destroy() {
		this.element.parentNode.removeChild(this.element);
	}
}
