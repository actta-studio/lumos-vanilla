import Page from "classes/Page";

export default class Product extends Page {
	constructor() {
		super({ id: "product", element: ".product" });
	}

	show() {
		super.show();
		this.loading = false;
	}

	addEventListener() {
		super.addEventListener();
	}
}
