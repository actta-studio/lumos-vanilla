import Component from "classes/Component";

export default class Button extends Component {
	constructor({ element }) {
		super({ element });
	}

	onMouseEnter() {}

	onMouseLeave() {}

	addEventListeners() {
		this.onMouseEnterEvent = this.onMouseEnter.bind(this);
		this.onMouseLeaveEvent = this.onMouseLeave.bind(this);
		this.element.addEventListener("mouseenter", (_) => this.onMouseEnterEvent);
		this.element.addEventListener("mouseleave", (_) => this.onMouseLeaveEvent);
	}

	removeEventListeners() {
		this.element.removeEventListener(
			"mouseenter",
			(_) => this.onMouseEnterEvent
		);
		this.element.removeEventListener(
			"mouseleave",
			(_) => this.onMouseLeaveEvent
		);
	}
}
