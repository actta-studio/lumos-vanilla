import each from "lodash/each";

import Home from "./pages/home";
import Shop from "./pages/shop";
import Product from "./pages/product";
import Article from "./pages/article";
import Contact from "./pages/contact";
import NotFound from "./pages/notFound";

class App {
	constructor() {
		this.createContent();
		this.createPages();
		this.addLinkListeners();
	}

	// selects the main content div wrapper
	createContent() {
		this.content = document.querySelector("#content");
		this.template = this.content.getAttribute("data-template");
	}

	// creates pages by storing them in a new Map() with key value pairs
	createPages() {
		// create a new Map() to store the pages and what class they are going to initialize
		this.pages = new Map();

		// set the key value pairs for all existing pages
		this.pages.set("home", new Home());
		this.pages.set("shop", new Shop());
		this.pages.set("product", new Product());
		this.pages.set("article", new Article());
		this.pages.set("contact", new Contact());
		this.pages.set("404", new NotFound());

		this.page = this.pages.get(this.template);
		this.page.create();
		this.page.show();
	}

	async onChange(url) {
		await this.page.hide();
		const request = await window.fetch(url);

		if (request.status === 200) {
			const html = await request.text();
			// create a new div element
			const div = document.createElement("div");

			// set the innerHTML of the div to the html that was fetched
			div.innerHTML = html;

			// get the content div from the new html
			const divContent = div.querySelector("#content");
			this.template = divContent.getAttribute("data-template");

			this.content.setAttribute(
				"data-template",
				divContent.getAttribute("data-template")
			);
			// assign the new content to the current content
			this.content.innerHTML = divContent.innerHTML;

			this.page = this.pages.get(this.template);
			this.page.create();
			this.page.show();
		} else {
			console.log(404);
		}

		console.log(request);
	}

	addLinkListeners() {
		const links = document.querySelectorAll("a");

		each(links, (link) => {
			link.onclick = (event) => {
				event.preventDefault();

				// const {
				// 	target: { href },
				// } = event;

				const { href } = link;

				this.onChange(href);
			};
		});
	}
}

new App();
