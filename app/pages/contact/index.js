import Page from "classes/Page";

export default class Contact extends Page {
	constructor({ lenis }) {
		super({ id: "contact", element: ".contact" });

		this.lenis = lenis;
	}

	show() {
		super.show();
		this.lenis.start();
	}
}
