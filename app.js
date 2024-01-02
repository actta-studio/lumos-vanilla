require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const logger = require("morgan");
const router = require("./routes/index");
const store = require("store");
const favicon = require("serve-favicon");

const prismic = require("@prismicio/client");
const port = 3000;
const {
	handleLinkResolver,
	noHeader,
	noFooter,
	noHeaderLogo,
	handleLanguageDisplay,
	handleShowcaseImage,
} = require("./config/site-config");

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use((req, res, next) => {
	if (req.query.lang) {
		store.set("lang", req.query.lang);
	}
	res.locals.Prismic = prismic;
	res.locals.Link = handleLinkResolver;
	res.locals.noHeader = noHeader;
	res.locals.noFooter = noFooter;
	res.locals.noHeaderLogo = noHeaderLogo;
	res.locals.Lang = handleLanguageDisplay;
	res.locals.URL = handleShowcaseImage;
	next();
});

app.use(favicon("public/favicon.ico"));

if (process.env.NODE_ENV === "development") {
	app.use(errorHandler());
	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(methodOverride());
}

app.use("/", router);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
