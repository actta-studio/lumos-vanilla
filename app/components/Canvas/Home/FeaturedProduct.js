import Media from "./Media";
import { Transform } from "ogl";
import GSAP from "gsap";
import { map } from "lodash";

export default class FeaturedProduct {
	constructor({ element, gl, geometry, index, scene, sizes }) {
		this.element = element;
		this.elementWrapper = this.element.querySelector(
			".featured-products__wrapper"
		);
		this.gl = gl;
		this.geometry = geometry;
		this.index = index;
		this.scene = scene;
		this.sizes = sizes;

		this.group = new Transform();

		this.scroll = {
			current: 0,
			target: 0,
			start: 0,
			lerp: 0.1,
		};

		this.createMedias();
		this.onResize({ sizes });

		this.group.setParent(this.scene);
	}

	createMedias() {
		this.mediasElements = document.querySelectorAll(
			".featured-product picture"
		);

		this.medias = map(this.mediasElements, (element, index) => {
			return new Media({
				element,
				gl: this.gl,
				geometry: this.geometry,
				index,
				scene: this.group,
				sizes: this.sizes,
			});
		});
	}

	onResize(event) {
		this.bounds = this.elementWrapper.getBoundingClientRect();

		this.sizes = event.sizes;

		this.width = (this.bounds.width / window.innerWidth) * this.sizes.width;

		this.scroll.current = this.scroll.target = 0;

		map(this.medias, (media) => media.onResize(event, this.scroll.current));
	}

	onTouchDown({ x, y }) {
		this.scroll.start = this.scroll.current;
	}

	onTouchMove({ x, y }) {
		const distance = x.start - x.end;

		this.scroll.target = this.scroll.start - distance;
	}

	onTouchUp({ x, y }) {}

	update() {
		if (!this.bounds) return;

		if (this.scroll.current < this.scroll.target) {
			this.direction = "right";
		} else if (this.scroll.current > this.scroll.target) {
			this.direction = "left";
		}

		this.scroll.current = GSAP.utils.interpolate(
			this.scroll.current,
			this.scroll.target,
			this.scroll.lerp
		);

		map(this.medias, (media, index) => {
			const scaleX = media.mesh.scale.x / 2;

			if (this.direction === "left") {
				const x = media.mesh.position.x + scaleX;

				if (x < -this.sizes.width / 2) {
					media.extra.x += this.gallerySizes.width;

					media.mesh.rotation.z = GSAP.utils.random(
						-Math.PI * 0.03,
						Math.PI * 0.03
					);
				}
			} else if (this.direction === "right") {
				const x = media.mesh.position.x - scaleX;

				if (x > this.sizes.width / 2) {
					media.extra.x -= this.gallerySizes.width;

					media.mesh.rotation.z = GSAP.utils.random(
						-Math.PI * 0.03,
						Math.PI * 0.03
					);
				}
			}

			media.update(this.scroll.current);
		});
	}
}
