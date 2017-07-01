
require('dotenv').config();
const express = require ("express");
const router = express.Router();
const renderTemplate = require("../utility/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");
const User = require("../models/users.js");
const Sequelize = require("sequelize");


router.post("/signup", function(req,res) {
	User.create({
		username: req.body.username,
		password: req.body.password,
	})
	.then(function(user) {
		console.log(user);
		res.redirect("/");
	})
	.catch(function(err) {
		res.send("Error");
	});
});

router.get("/", function(req, res) {
	renderTemplate(res, "home", "Home", {
	});
});

router.get("/login", function(req, res) {
	renderTemplate(res, "login", "Login", {

	});
});

router.get("/signup", function(req, res) {
	renderTemplate(res, "signup", "Signup", {

	});
});












module.exports = router;
