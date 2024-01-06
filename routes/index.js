const asyncHandler = require("../utils/async-handler");
const { PrismicError } = require("@prismicio/client");
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
	asyncHandler(async (req, res) => {
		const lang = req.params.lang;
		const defaults = await handleDefaultRequests(lang);

		if (!siteConfig.supportedLanguages.includes(lang)) {
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		}

		const document = await client
			.getSingle("home", {
				fetchLinks: [
					"product.image",
					"product.title",
					"collection.collection_title",
					"article.label",
					"article.featured_image",
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

		// document.data.body.forEach((slice) => {
		// 	if (slice.slice_type === "article_cta") {
		// 		console.log(slice.primary.article.data);
		// 	}
		// });

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
			res.status(404).render("pages/404", { ...defaults, lang: lang });
		} else {
			res.render("pages/shop", { ...defaults, document });
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
