import Page from "classes/Page";
import { each } from "lodash";
import Products from "animations/Products";
import GSAP from "gsap";
import { map } from "lodash";
import CustomEase from "gsap/CustomEase";

export default class Shop extends Page {
	constructor({ lenis }) {
		super({
			id: "shop",
			element: ".shop",
			elements: {
				animatedProducts: "[data-animation='products']",
			},
		});

		this.lenis = lenis;

		this.addEventListeners();
	}

	create() {
		super.create();
		this.createAnimations();
	}

	createAnimations() {
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
	}

	show() {
		super.show();
		this.lenis.start();

		this.loading = false;
		this.currentPage = parseInt(
			document.querySelector(".product-grid").dataset.page
		);
		this.totalPages = parseInt(
			document.querySelector(".product-grid").dataset.total
		);
		this.collection = window.location.search.split("=")[1] || null;
		this.lang = window.location.pathname.split("/")[1] || "en-us";

		this.addObservers();
	}

	async fetchProductInfo({ url, push = true }) {
		// maybe zoom out content and slide in modal

		// GSAP.to("body", {
		// 	scale: 0.985,
		// 	duration: 0.5,
		// 	ease: "power2.inOut",
		// });

		// slide in product modal

		return;

		const request = await window.fetch(url);

		if (request.status === 200) {
			const html = await request.text();
			const div = document.createElement("div");
			if (push) {
				window.history.pushState({}, "", url);
			}
			div.innerHTML = html;
			const divContent = div.querySelector("#content");

			const product = document.createElement("div");
			product.className = "product-modal";
			product.innerHTML = divContent.innerHTML;

			document.body.appendChild(product);

			// this.cursor.update();
		}
	}

	updateAnimations(products) {
		// note: finish this
		console.log("products to be updated: ", products);
		each(products, (product) => {
			return new Products({ element: product });
		});
	}

	async fetchProducts() {
		this.loading = true;

		document.querySelector(".shop .loading-indicator").classList.add("active");

		document
			.querySelector(".shop .loading-indicator")
			.classList.remove("active");

		this.currentPage = parseInt(
			document.querySelector(".product-grid").dataset.page
		);

		this.totalPages = parseInt(
			document.querySelector(".product-grid").dataset.total
		);

		this.collection = window.location.search.split("=")[1] || null;
		this.lang = window.location.pathname.split("/")[1] || "en-us";

		if (this.currentPage >= this.totalPages) {
			document.querySelector(".shop .sentinel").remove();
			return;
		}

		const url = this.collection
			? `/${this.lang}/shop?collection=${this.collection}&page=${
					this.currentPage + 1
			  }`
			: `/${this.lang}/shop?page=${this.currentPage + 1}`;

		const response = await window.fetch(url);

		if (!response.ok) {
			return;
		}

		this.currentPage += 1;

		const html = await response.text();
		const parser = new DOMParser();
		const htmlDocument = parser.parseFromString(html, "text/html");
		const newProducts = htmlDocument.querySelector(".product-grid").children;
		this.addEventListenersToLinks(newProducts);
		this.updateAnimations(newProducts);
		document.querySelector(".product-grid").append(...newProducts);
		document.querySelector(".product-grid").dataset.page = this.currentPage;

		this.loading = false;
	}

	animateInProducts() {}

	animateOutProducts() {
		return new Promise((resolve, reject) => {
			const products = document.querySelectorAll(
				".product-grid__product__image"
			);

			GSAP.to(products, {
				filter: "grayscale(1)",
				duration: 1,
				ease: "power2.inOut",
				onComplete: resolve,
			});
		});
	}

	addEventListeners() {
		const links = document.querySelectorAll("a[data-toggle]");
		this.addEventListenersToLinks(links);
	}

	addEventListenersToLinks(links) {
		each(links, (link) => {
			link.onclick = (event) => {
				event.preventDefault();
				const { href } = link;

				this.fetchProductInfo({ url: href });
			};
		});
	}

	addObservers() {
		const sentinel = document.querySelector(".shop .sentinel");

		if (!sentinel) return;

		const observer = new window.IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				this.fetchProducts();
			}
		});

		observer.observe(sentinel);
	}
}
