const asyncHandler = require("../utils/async-handler");
const { PrismicError } = require("@prismicio/client");
const { client } = require("../config/prismic-config");
const siteConfig = require("../config/site-config");

const router = require("express").Router();

const handleDefaultRequests = async (lang) => {
	siteConfig.setLang(lang || siteConfig.defaultLanguage);

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

	return {
		preloader,
		meta,
		navigation,
	};
};

router.get("/", (req, res) => {
	res.redirect(siteConfig.defaultLanguage);
});

router.get(
	"/:lang",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		const defaults = await handleDefaultRequests(lang);

		const document = await client
			.getSingle("home", {
				fetchLinks: [
					"product.image",
					"product.title",
					"collection.collection_title",
				],
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

		document.data.body.forEach((slice) => {
			if (slice.slice_type === "collections") {
				console.log(slice.items[0].collection.data);
			}
		});

		if (!document) {
			res.status(404).render("pages/404", { lang: lang });
		} else {
			res.render("pages/home", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/shop",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		const defaults = await handleDefaultRequests(lang);

		const document = await client.getSingle("shop", { lang }).catch((err) => {
			if (
				!(err instanceof PrismicError) ||
				err.message !== "No documents were returned"
			) {
				console.log(err);
			}
			return null;
		});

		if (!document) {
			res.status(404).render("pages/404", { lang: lang });
		} else {
			res.render("pages/shop", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/lookbook",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		const defaults = await handleDefaultRequests(lang);

		const document = await client
			.getAllByType("collection", {
				lang,
				fetchLinks: "product.image",
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
			res.status(404).render("pages/404", { lang: lang });
		} else {
			res.render("pages/lookbook", { ...defaults, document });
		}
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
			res.status(404).render("pages/404", { lang: lang });
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
			res.status(404).render("pages/404", { lang: lang });
		} else {
			res.render("pages/contact", { ...defaults, document });
		}
	})
);

router.get(
	"/:lang/*",
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;

		res.status(404).render("pages/404", { lang: lang });
	})
);

module.exports = router;
