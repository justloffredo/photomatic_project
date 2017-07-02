const express = require ("express");
const router = express.Router();
const renderTemplate = require("../utility/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");






router.get("/", function(req, res) {
	renderTemplate(res, "home", "Home", {
	});
});














module.exports = router;
