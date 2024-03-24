import { Transform, Plane } from "ogl";
import { each, map } from "lodash";
import FeaturedProduct from "./FeaturedProduct";

export default class Home {
	constructor({ gl, scene, sizes }) {
		this.sizes = sizes;
		this.gl = gl;
		this.scene = scene;
		this.group = new Transform();
		this.slider = document.querySelectorAll(".featured-products");
		this.createGeometry();
		this.createFeaturedSlider();

		this.group.setParent(scene);
	}

	createGeometry() {
		this.geometry = new Plane(this.gl);
	}

	createFeaturedSlider() {
		this.features = map(this.slider, (element, index) => {
			return new FeaturedProduct({
				element,
				gl: this.gl,
				geometry: this.geometry,
				index,
				scene: this.scene,
				sizes: this.sizes,
			});
		});
	}

	onResize(event) {
		map(this.features, (element) => element.onResize(event));
	}

	onTouchDown(event) {
		map(this.features, (element) => element.onTouchDown(event));
	}

	onTouchMove(event) {
		map(this.features, (element) => element.onTouchDown(event));
	}

	onTouchUp(event) {
		map(this.features, (element) => element.onTouchUp(event));
	}

	onWheel({ pixelX, pixelY }) {
		this.x.target += pixelX;
		this.y.target += pixelY;
	}

	update() {
		if (!this.galleryBounds) return;

		map(this.features, (feature) => feature.update());
	}

	destroy() {
		//
	}
}
