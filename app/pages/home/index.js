import Page from "classes/Page";

export default class Home extends Page {
	constructor() {
		super({
			id: "home",
			element: ".home",
			elements: {
				header: document.querySelector(".navigation--header"),
				links: ".a--link",
			},
		});
	}

	create() {
		super.create();

		this.elements.get("links").forEach((link) => {
			link.addEventListener("click", (event) => {
				event.preventDefault();
				console.log("clicked");
			});
		});
	}
}
