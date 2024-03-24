import each from "lodash/each";

import Detection from "classes/Detection";
import Lenis from "@studio-freight/lenis";
import GSAP from "gsap";

import Home from "pages/home";
import Shop from "pages/shop";
import Product from "pages/product";
import Article from "pages/article";
import Contact from "pages/contact";
import NotFound from "pages/notFound";

import Preloader from "components/Preloader";
import Navigation from "components/Navigation";
import Grid from "components/Grid";
import Cursor from "components/Cursor";
import Transition from "components/Transition";

import CustomEase from "gsap/CustomEase";

GSAP.registerPlugin(CustomEase);

class App {
	constructor() {
		this.createContent();

		this.initLenis();
		this.createPreloader();
		this.createNavigation();
		this.createPages();
		this.createDesignGrid();
		this.createCursor();
		this.createTransition();

		this.addLinkListeners();
		this.addEventListeners();
	}

	createContent() {
		this.content = document.querySelector("#content");
		this.template = this.content.getAttribute("data-template");
		this.navContent = document.querySelector("header");
	}

	createCursor() {
		this.cursor = new Cursor();
	}

	initLenis() {
		window.scrollTo(0, 0);
		this.lenis = new Lenis({
			easing: (x) => {
				return -(Math.cos(Math.PI * x) - 1) / 2;
			},
		});

		this.raf = this.raf.bind(this);
		requestAnimationFrame(this.raf);

		this.lenis.stop();
	}

	raf(time) {
		this.lenis.raf(time);
		requestAnimationFrame(this.raf);
	}

	createTransition() {
		this.transition = new Transition();
	}

	createDesignGrid() {
		this.grid = new Grid(5);
		this.grid.create();
	}

	suspendScroll() {
		this.lenis.stop();
	}

	resumeScroll() {
		this.lenis.start();
	}

	createPages() {
		this.pages = new Map();

		this.pages.set("home", new Home({ lenis: this.lenis }));
		this.pages.set("shop", new Shop({ lenis: this.lenis }));
		this.pages.set("product", new Product({ lenis: this.lenis }));
		this.pages.set("article", new Article({ lenis: this.lenis }));
		this.pages.set("contact", new Contact({ lenis: this.lenis }));
		this.pages.set("404", new NotFound({ lenis: this.lenis }));

		this.page = this.pages.get(this.template);
		this.page.create({ sourcePreloader: true });
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once("completed", this.onPreloaded.bind(this));
	}

	createNavigation() {
		this.navigation = new Navigation({
			template: this.template,
			lenis: this.lenis,
		});
	}

	async onChange({ url, push = true }) {
		if (url === window.location.href) return;

		if (url.includes("/shop") && window.location.href.includes("/shop")) {
			await this.pages.get("shop").animateOutProducts();
		}

		await this.navigation.onChange();

		await this.transition.animateIn();
		window.scrollTo(0, 0);

		this.page.hide();
		this.page.destroy();

		const request = await window.fetch(url);

		if (request.status === 200) {
			const html = await request.text();
			const div = document.createElement("div");
			if (push) {
				window.history.pushState({}, "", url);
			}
			div.innerHTML = html;
			const divContent = div.querySelector("#content");
			this.template = divContent.getAttribute("data-template");

			this.navigation.removeEventListeners();

			const navDiv = div.querySelector("header");
			this.navContent.innerHTML = navDiv.innerHTML;

			this.navigation.addEventListeners();
			this.navigation.reinitialize();

			this.content.setAttribute(
				"data-template",
				divContent.getAttribute("data-template")
			);

			this.content.innerHTML = divContent.innerHTML;

			this.page = this.pages.get(this.template);
			this.page.create({ sourcePreloader: false });
			this.page.show();
			this.transition.animateOut();
			this.addLinkListeners();
		} else {
			console.log(404);
		}
	}

	onPreloaded() {
		window.scrollTo(0, 0);
		this.preloader.destroy();
		this.page.show();
	}

	async onPopState() {
		await this.onChange({ url: window.location.pathname, push: false });
	}

	addEventListeners() {
		window.addEventListener("popstate", this.onPopState.bind(this));
	}

	removeEventListeners() {
		window.removeEventListener("popstate", this.onPopState.bind(this));
	}

	addLinkListeners() {
		const allLinks = document.querySelectorAll("a");
		const disabledLinks = document.querySelectorAll("a[data-state='disabled']");

		each(disabledLinks, (link) => {
			link.onclick = (event) => {
				event.preventDefault();
			};
		});

		const links = Array.from(allLinks).filter(
			(link) => link.getAttribute("data-state") !== "disabled"
		);

		each(links, (link) => {
			link.onclick = (event) => {
				event.preventDefault();
				const { href } = link;

				this.onChange({ url: href });
			};
		});

		this.navigation.reinitialize();
	}
}

new App();
