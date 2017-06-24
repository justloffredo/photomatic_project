require('dotenv').config();
const express = require('express');
const sql = require("./utility/sql.js");
const bodyParser = require('body-parser');
const personalWebsiteRouter = require("./Routes/personal_website.js");
const countryAppRouter = require("./Routes/country_app.js");
const renderTemplate = require("./utility/renderTemplate.js");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("assets"));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());





app.use("/", personalWebsiteRouter);
app.use("/", countryAppRouter);
app.get("*", function(req, res) {
	renderTemplate(res,"404");
});


sql.sync().then(function() {
	console.log("Database synced");
	const port = process.env.PORT || 3000;

	app.listen(port, function() {
		console.log("Listening at http://localhost:" + port);
	});
});
