const asyncHandler = require("../utils/async-handler");
const { PrismicError } = require("@prismicio/client");
const prismic = require("@prismicio/client");
const { client } = require("../config/prismic-config");
const siteConfig = require("../config/site-config");

const router = require("express").Router();

const handleDefaultRequests = async (lang) => {
	lang = siteConfig.supportedLanguages.includes(lang)
		? lang
		: siteConfig.defaultLanguage;

	const preloader = await client
		.getSingle("preloader", {
			lang,
		})
		.catch((err) => {
			if (
				!(err instanceof PrismicError) ||
				err.message !== "No documents were returned"
			) {
				console.log(err);
			}
			return null;
		});

	const meta = await client.getSingle("meta", { lang }).catch((err) => {
		if (
			!(err instanceof PrismicError) ||
			err.message !== "No documents were returned"
		) {
			console.log(err);
		}
		return null;
	});

	const navigation = await client
		.getSingle("navigation", { lang })
		.catch((err) => {
			if (
				!(err instanceof PrismicError) ||
				err.message !== "No documents were returned"
			) {
				console.log(err);
			}
			return null;
		});

	const notFound = await client
		.getSingle("404", {
			lang,
		})
		.catch((err) => {
			if (
				!(err instanceof PrismicError) ||
				err.message !== "No documents were returned"
			) {
				console.log(err);
			}
			return null;
		});

	const document = navigation;

	console.log(document.data.directory);

	console.log(navigation);

	return {
		preloader,
		meta,
		navigation,
		document,
		notFound,
	};
};

router.get("/", (req, res) => {
	res.redirect(siteConfig.defaultLanguage);
});

router.get(
	"/:lang",
	asyncHandler(async (req, res, next) => {
		const lang = req.params.lang;

		if (!lang) {
			return next(new Error("Language parameter is missing"));
		}

		const defaults = await handleDefaultRequests(lang);

		if (!siteConfig.supportedLanguages.includes(lang)) {
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		}

		const document = await client
			.getSingle("home", {
				fetchLinks: [
					"product.image",
					"product_showcase.product",
					"product.title",
					"collection.collection_title",
					"article.label",
					"article.featured_image",
				],
				lang: lang || "",
			})
			.catch((err) => {
				if (
					!(err instanceof PrismicError) ||
					err.message !== "No documents were returned"
				) {
					console.log(err);
				}
				return null;
			});

		if (!document) {
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		} else {
			res.render("pages/home", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/shop",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		if (!lang) {
			return res.status(400).send("Language parameter is missing");
		}
		const defaults = await handleDefaultRequests(lang);

		let collection = req.query.collection || "";
		const page = req.query.page;

		//  switch case for collection filter - if it is lampe-sur-pied then change the collection to floor-lamps, if it is lampe-de-table then change the collection to table-lamps, if it is lampe-de-nuit then change the collection to night-lamps, if it is limitee then change the collection to limited-edition, if it is "" then leave it
		switch (collection) {
			case "lampe-sur-pied":
				collection = "floor-lamps";
				break;
			case "lampe-de-table":
				collection = "table-lamps";
				break;
			case "lampe-de-nuit":
				collection = "night-lights";
				break;
			case "limitee":
				collection = "limited-edition";
				break;
			default:
				break;
		}

		console.log(collection);

		const document = await client
			.getSingle("shop", {
				lang: lang,
				fetchLinks: "collection.collection_title",
			})
			.catch((err) => {
				if (
					!(err instanceof PrismicError) ||
					err.message !== "No documents were returned"
				) {
					console.log(err);
				}
				return res.status(500).send("An error occurred");
			});

		if (!document) {
			return;
		}

		const params = {
			lang,
			pageSize: 10,
			page: page || null,
			filters: [collection && prismic.filter.at("document.tags", [collection])],
			orderings: [{ field: "my.product.title", order: "asc" }],
		};

		const products = await client.getByType("product", {
			...params,
		});

		console.log({ ...products, collection: collection });

		return res.render("pages/shop", {
			...defaults,
			document,
			products: { ...products, collection: collection },
		});
	})
);

router.get(
	"/:lang/product/:uid",
	asyncHandler(async (req, res) => {
		const { lang, uid } = req.params;
		const defaults = await handleDefaultRequests(lang);

		const document = await client
			.getByUID("product", uid, {
				lang,
				fetchLinks: "collection.collection_title",
			})
			.catch((err) => {
				if (
					!(err instanceof PrismicError) ||
					err.message !== "No documents were returned"
				) {
					console.log(err);
				}
				return null;
			});

		if (!document) {
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		} else {
			res.render("pages/product", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/contact",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		const defaults = await handleDefaultRequests(lang);

		const document = await client
			.getSingle("contact_us", {
				lang,
			})
			.catch((err) => {
				if (
					!(err instanceof PrismicError) ||
					err.message !== "No documents were returned"
				) {
					console.log(err);
				}
				return null;
			});

		if (!document) {
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		} else {
			res.render("pages/contact", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/press/:uid",
	asyncHandler(async (req, res) => {
		const { lang, uid } = req.params;
		const defaults = await handleDefaultRequests(lang);

		const document = await client
			.getByUID("article", uid, {
				lang,
			})
			.catch((err) => {
				if (
					!(err instanceof PrismicError) ||
					err.message !== "No documents were returned"
				) {
					console.log(err);
				}
				return null;
			});

		console.log(document.data);

		if (!document) {
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		} else {
			res.render("pages/article", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/*",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		const defaults = await handleDefaultRequests(lang);

		res.status(404).render("pages/404", {
			...defaults,
			lang: lang,
		});
	})
);

module.exports = router;
