import Component from "classes/Component";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

export default class Navigation extends Component {
	constructor({ template, lenis }) {
		super({
			element: ".nav--collapsed",
			elements: {
				// toggle: document.querySelector(".nav--collapsed .nav-toggle"),
				// lines: document.querySelectorAll(".nav--collapsed .nav-toggle span"),
				menu: document.querySelector(".nav--collapsed .menu"),
				clock: document.querySelector(".nav .time-data"),
			},
		});

		this.lenis = lenis;

		this.onClickEvent = this.toggle.bind(this);
		this.onResizeEvent = this.resize.bind(this);

		this.initClock();

		console.log(this.elements.get("links"));

		this.timeline = gsap
			.timeline({
				paused: true,
				defaults: {
					ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
				},
			})
			.to(".nav--collapsed .menu", {
				autoAlpha: 1,
			})
			.to(".nav--collapsed .menu", {
				scaleY: 1,
				duration: 0.6,
				ease: "power2.inOut",
				pointerEvents: "all",
				onStart: () => {
					this.lenis.stop();
					document.querySelector(".nav--collapsed .nav-toggle").disabled = true;
				},
			})
			.to(
				".nav--collapsed .nav-toggle span",
				{
					backgroundColor: "#eceae5",
					duration: 0.3,
				},
				"<"
			)
			.to(
				".nav--collapsed .nav-toggle span",
				{
					duration: 0.3,
					width: "1.4rem",
					ease: "power2.inOut",
					stagger: 0.05,
				},
				"<"
			)
			.to(
				".nav--collapsed .nav-toggle",
				{
					rotate: -90,
				},
				"=-0.15"
			)
			.to(".nav--collapsed .nav-toggle span", {
				width: "3.4rem",
				duration: 0.3,
				stagger: 0.1,
			});

		// .fromTo(
		// 	".nav--collapsed .menu a",
		// 	{
		// 		// autoAlpha: 0,
		// 		// xPercent: -5,
		// 	},
		// 	{
		// 		// autoAlpha: 1,
		// 		// xPercent: 0,
		// 		stagger: 0.1,
		// 		ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
		// 		onComplete: () => {
		// 			document.querySelector(
		// 				".nav--collapsed .nav-toggle"
		// 			).disabled = false;
		// 		},
		// 	}
		// );

		this.timeline.call(
			() =>
				(document.querySelector(".nav--collapsed .nav-toggle").disabled = false)
		);

		this.addEventListeners();
	}

	initClock() {
		document.addEventListener("DOMContentLoaded", () => {
			this.addTime();
		});
	}

	reinitClock() {
		this.addTime();
	}

	killClock() {
		document.removeEventListener("DOMContentLoaded", () => {
			this.addTime();
		});
	}

	addTime() {
		const updateClock = () => {
			const date = new Date();

			const options = {
				timeZone: "America/Toronto",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			};
			const formatter = new Intl.DateTimeFormat("en-CA", options);

			// Update clock
			this.elements.get("clock").textContent =
				formatter.format(date) + " Montreal, CA";

			// Update clock every minute
			setTimeout(updateClock, 60000);
		};

		updateClock();
	}

	reinitialize() {
		this.timeline = gsap
			.timeline({
				paused: true,
				defaults: {
					ease: CustomEase.create("custom", "0.4, 0, 0.22, 1"),
				},
			})
			.set(".nav--collapsed .menu", {
				autoAlpha: 1,
			})
			.to(".nav--collapsed .menu", {
				scaleY: 1,
				duration: 0.6,
				ease: "power2.inOut",
				pointerEvents: "all",
				onStart: () => {
					this.lenis.stop();
					document.querySelector(".nav--collapsed .nav-toggle").disabled = true;
				},
			})
			.to(
				".nav--collapsed .nav-toggle span",
				{
					backgroundColor: "#eceae5",
					duration: 0.3,
				},
				"<"
			)
			.to(
				".nav--collapsed .nav-toggle span",
				{
					duration: 0.3,
					width: "1.4rem",
					ease: "power2.inOut",
					stagger: 0.05,
				},
				"<"
			)
			.to(
				".nav--collapsed .nav-toggle",
				{
					rotate: -90,
				},
				"=-0.15"
			)
			.to(".nav--collapsed .nav-toggle span", {
				width: "3.4rem",
				duration: 0.3,
				stagger: 0.1,
			});

		this.timeline.call(
			() =>
				(document.querySelector(".nav--collapsed .nav-toggle").disabled = false)
		);
	}

	async onChange() {
		// if menu is open, close it
		const isOpen =
			document
				.querySelector(".nav--collapsed .nav-toggle")
				.getAttribute("aria-expanded") === "true";

		if (isOpen) {
			await this.toggle();
		}

		this.killClock();
		this.addTime();
	}

	toggle() {
		return new Promise((resolve, reject) => {
			// console.log("toggle", this.element);

			const isOpen =
				document
					.querySelector(".nav--collapsed .nav-toggle")
					.getAttribute("aria-expanded") === "true";

			document
				.querySelector(".nav--collapsed .nav-toggle")
				.setAttribute("aria-expanded", !isOpen);
			document
				.querySelector(".nav--collapsed .menu")
				.setAttribute("aria-hidden", isOpen);

			if (!isOpen) {
				this.timeline.play().eventCallback("onComplete", resolve);
			} else {
				this.timeline.reverse().eventCallback("onReverseComplete", () => {
					this.lenis.start();
					resolve();
				});
			}
		});
	}

	resize() {
		const isMobile = window.matchMedia("(max-width: 430px)").matches;

		if (!isMobile) {
			document
				.querySelector(".nav--collapsed .nav-toggle")
				.setAttribute("aria-expanded", false);
			document
				.querySelector(".nav--collapsed .menu")
				.setAttribute("aria-hidden", true);
			gsap.set(".nav--collapsed .menu", { autoAlpha: 0 });
		}
	}

	addEventListeners() {
		document
			.querySelector(".nav--collapsed .nav-toggle")
			.addEventListener("click", this.onClickEvent);
		window.addEventListener("resize", this.onResizeEvent);
	}

	removeEventListeners() {
		document
			.querySelector(".nav--collapsed .nav-toggle")
			.addEventListener("click", this.onClickEvent);
		window.removeEventListener("resize", this.onResizeEvent);
	}
}
