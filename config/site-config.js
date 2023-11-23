const store = require("store");

module.exports = {
	isolatedViews: ["product", "lookbook"],
	defaultLanguage: "en-us",
	getLang: () => {
		return store.get("lang") || "en-us";
	},
	handleLinkResolver: (doc) => {
		if (doc.type == "home") {
			return "/";
		} else if (doc.type == "lookbook") {
			return "/lookbook";
		} else if (doc.type == "shop") {
			return "/shop";
		} else if (doc.type == "product") {
			return `/product/${doc.slug}`;
		} else if (doc.type == "contact_us") {
			return "/contact";
		} else {
			return `/${doc.slug}`;
		}
	},
};
