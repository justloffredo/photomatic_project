const express = require ("express");
const router = express.Router();
const User = require("../models/users.js");
const renderTemplate = require("../utility/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");






router.get("/", function(req, res) {
	if(req.user) {
		console.log(req.user);
		renderTemplate(res, "home", "Home", {

	});
}
	else {
		res.redirect("/login");
	}
});














module.exports = router;
