export default class Page {
	constructor({ id }) {
		console.log("Page constructor");

		this.id = id;

		this.create();
	}

	create() {
		console.log("create", this.id);
	}
}
