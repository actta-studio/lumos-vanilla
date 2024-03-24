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
		if (this.elements.get("images").length === 0) {
			this.elements.get("progress").innerHTML = "100%";
			this.onLoaded();
			return;
		}

		each(this.elements.get("images"), (element) => {
			element.onload = (_) => this.onAssetLoaded(element);
			element.src = element.getAttribute("data-src");
			element.classList.add("loaded");
		});
	}

	onAssetLoaded(image) {
		this.length += 1;
		const percent = this.length / (this.elements.get("images").length ?? 1);

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

			let prefersReduced = window.matchMedia(
				"(prefers-reduced-motion: reduce)"
			);

			if (prefersReduced.matches) {
				this.animateOut.to(this.elements.get("progress"), {
					autoAlpha: 0,
					duration: 0.75,
					ease: "expo.out",
					onComplete: resolve,
				});
			} else {
				this.animateOut.to(this.elements.get("progress"), {
					autoAlpha: 0,
					ease: "expo.out",
					onComplete: resolve,
					delay: 0.5,
				});
			}

			this.animateOut.call((_) => this.emit("completed"));
		});
	}

	destroy() {
		this.element.parentNode.removeChild(this.element);
	}
}
