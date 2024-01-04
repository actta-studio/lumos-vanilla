import Page from "classes/Page";

export default class Article extends Page {
	constructor() {
		super({ id: "article", element: ".article" });
	}
}
