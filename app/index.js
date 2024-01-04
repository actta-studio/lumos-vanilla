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
	}

	// selects the main content div wrapper
	createContent() {
		this.content = document.querySelector("#content");
		this.template = this.content.getAttribute("data-template");

		console.log("template - ", this.template);
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
		console.log("page: ", this.page);
	}
}

new App();
