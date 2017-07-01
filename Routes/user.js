const express = require("express");
const User = require("../models/users.js");
const renderTemplate = require("../utility/renderTemplate.js");
const router = express.Router();

router.post("/signup", function(req,res) {
	
});

router.get("/login", function(req, res) {
	renderTemplate(res, "login", "Login", {

	});
});

router.get("/signup", function(req, res) {
	renderTemplate(res, "signup", "Signup", {
		error: error,

	});
});

module.exports = router;
