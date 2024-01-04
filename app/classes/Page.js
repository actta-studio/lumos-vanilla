import each from "lodash/each";

export default class Page {
	constructor({ id, element, elements }) {
		this.id = id;
		this.selector = element;
		this.selectorChildren = {
			...elements,
		};
	}

	create() {
		this.element = document.querySelector(this.selector);
		this.elements = new Map();

		each(this.selectorChildren, (selector, key) => {
			console.log(
				`selector: ${selector} - `,
				selector instanceof window.HTMLElement
			);
			if (
				selector instanceof window.HTMLElement ||
				selector instanceof window.NodeList
			) {
				this.elements.set(key, selector);
			} else if (Array.isArray(selector)) {
				this.elements.set(key, selector);
			} else {
				this.elements.set(key, document.querySelectorAll(selector));

				if (this.elements.get(key).length === 0) {
					this.elements.set(key, null);
				} else if (this.elements.get(key).length === 1) {
					this.elements.set(key, document.querySelector(selector));
				}
			}
		});
	}

	show () {}

	hide () {
		
	}
}
