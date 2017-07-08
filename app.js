require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectSessionSequelize = require('connect-session-sequelize');
const deserializeUserMW = require("./middleware/deSerialize.js");

const sql = require("./utility/sql.js");
const renderTemplate = require("./utility/renderTemplate.js");

const app = express();
const cookieSecret = process.env.COOKIE_SECRET || "dev";
const SessionStore = connectSessionSequelize(session.Store);

const photoRoutes = require("./Routes/photos.js");
const userRoutes = require("./Routes/user.js");



app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(session({
	secret: cookieSecret,
	store: new SessionStore({ db:sql }),
}));


// app.use(deserializeUserMW);


app.use("/user", userRoutes);
app.use("/photo", photoRoutes);
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
