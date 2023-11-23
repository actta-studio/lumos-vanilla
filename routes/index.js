const asyncHandler = require("../utils/async-handler");
const { client } = require("../config/prismic-config");
const { getLang } = require("../config/site-config");

const router = require("express").Router();

const handleDefaultRequests = async () => {
	const lang = getLang();
	const preloader = await client
		.getSingle("preloader", {
			lang,
		})
		.catch((err) => {
			if (err.response && err.response.status === 404) {
				console.log("Preloader not found");
				return null;
			} else {
				console.log(err.message);
				return {};
			}
		});

	const meta = await client.getSingle("meta", { lang }).catch((err) => {
		if (err.response && err.response.status === 404) {
			console.log("Metadata not found");
			return null;
		} else {
			console.log(err.message);
			return null;
		}
	});

	const navigation = await client
		.getSingle("navigation", { lang })
		.catch((err) => {
			if (err.response && err.response.status === 404) {
				console.log("Navigation not found");
				return null;
			} else {
				console.log(err.message);
				return null;
			}
		});

	return {
		preloader,
		meta,
		navigation,
	};
};

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const lang = getLang();
		const defaults = await handleDefaultRequests();

		const home = await client
			.getSingle("home", {
				lang,
				fetchLinks: ["product.image", "product.title"],
			})
			.catch((err) => {
				if (err.response && err.response.status === 404) {
					console.log("Homepage not found");
					return null;
				} else {
					console.log(err.message);
					return null;
				}
			});

		home.data.body.forEach((slice) => {
			console.log(slice.slice_type);
			if (slice.slice_type === "product_grid") {
				console.log(slice.items);
				// slice.items.forEach((item) => {
				// 	console.log(item);
				// });
			}
		});

		res.render("pages/home", { ...defaults, home });
	})
);

router.get(
	"/shop",
	asyncHandler(async (req, res) => {
		const lang = getLang();
		const defaults = await handleDefaultRequests();

		res.render("pages/shop", { ...defaults });
	})
);

router.get(
	"/lookbook",
	asyncHandler(async (req, res) => {
		const lang = getLang();
		const defaults = await handleDefaultRequests();

		const collections = await client
			.getAllByType("collection", {
				lang,
				fetchLinks: "product.image",
			})
			.catch((err) => {
				if (err.response && err.response.status === 404) {
					console.log("Lookbook Collections not found");
					return null;
				} else {
					console.log(err.message);
					return {};
				}
			});

		res.render("pages/lookbook", { collections, ...defaults });
	})
);

router.get(
	"/product/:uid",
	asyncHandler(async (req, res) => {
		const { uid } = req.params;
		const lang = getLang();
		const defaults = await handleDefaultRequests();

		const product = await client
			.getByUID("product", uid, {
				lang,
				fetchLinks: "collection.collection_title",
			})
			.catch((err) => {
				if (err.response && err.response.status === 404) {
					console.log("Product not found");
					return null;
				} else {
					console.log(err.message);
					return {};
				}
			});

		console.log(product.data.collection.data.collection_title);

		res.render("pages/product", { ...defaults, product });
	})
);

router.get(
	"/contact",
	asyncHandler(async (req, res) => {
		const lang = getLang();
		const defaults = await handleDefaultRequests();

		res.render("pages/contact", { ...defaults });
	})
);

module.exports = router;
