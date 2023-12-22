const store = require("store");

module.exports = {
	noHeader: ["product"],
	noFooter: ["product", "404"],
	noHeaderLogo: ["404"],
	defaultLanguage: "en-us",
	getLang: () => {
		return store.get("lang") || "en-us";
	},
	setLang: (lang) => {
		store.set("lang", lang || "en-us");
	},
	handleLinkResolver: (doc) => {
		if (typeof doc === "string") {
			return doc;
		} else if (doc.type === "shop") {
			return `/${doc.lang}/shop`;
		} else if (doc.type === "lookbook") {
			return `/${doc.lang}/lookbook`;
		} else if (doc.type === "contact_us") {
			return `/${doc.lang}/contact`;
		} else if (doc.type === "product") {
			return `/${doc.lang}/product/${doc.uid}`;
		} else if (doc.type === "collection") {
			return `/${doc.lang}/shop/?collection=${doc.uid}`;
		} else {
			return `/${doc.lang}/`;
		}
	},
	handleLanguageDisplay: (lang) => {
		switch (lang) {
			case "en-us":
				return "En";
			case "fr-ca":
				return "Fr";
			default:
				return "En";
		}
	},
};
