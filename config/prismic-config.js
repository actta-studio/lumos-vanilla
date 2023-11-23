// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
const fetch = import("node-fetch");
const prismic = require("@prismicio/client");
const { getLang } = require("./site-config");

const repoName = "lumos"; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN; // If your repository is private, add an access token.

// The `routes` property is your route resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
	{
		type: "home",
		path: "/",
	},
];

module.exports.linkResolver = function linkResolver(doc) {
	// const lang = getLang();
	if (doc.type === "home") {
		return `/?lang=${doc.lang}`;
	}
	return `/${doc.lang}`;
};

// module.exports.customLinks = function customLinks(path) {
// 	const lang = getLang();
// 	if (path === "/") {
// 		return `/?lang=${lang}`;
// 	} else {
// 		return `${path}/?lang=${lang}`;
// 	}
// };

module.exports.client = prismic.createClient(repoName, {
	fetch,
	accessToken,
	routes,
});
