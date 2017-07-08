const express = require("express");
const User = require("../models/users.js");
const renderTemplate = require("../utility/renderTemplate.js");
const router = express.Router();

router.get("/signup", function(req, res, error) {
	renderTemplate(res, "signup", "Signup", {
	});
});

router.post("/signup", function(req,res) {
			User.signup(req)
			.then(function() {
				res.redirect("/");
			})
			.catch(function(err) {
				res.status(400);
				renderTemplate(req, res, "signup", "Signup", {
					error: "Please ensure all fields are filled in properly",
				});
			});
		});


router.get("/login", function(req, res) {
	renderTemplate(res, "login", "Login", {
	});
});

router.post("/login", function(req, res) {
	User.login(req)
		.then(function() {
			res.redirect("/");
		})
		.catch(function(err) {
			res.status(400);
			renderTemplate(res, "login", "Login", {
				error: err.message,
			});
		});
});


<<<<<<< HEAD
router.get("/signup", function(req, res, error) {
	renderTemplate(res, "signup", "Signup", {

	});
=======
router.get("/logout", function(req, res) {
	req.session.userid = null;
	req.user = null;
	console.log(req.session);
	res.redirect("/");
>>>>>>> 2a84b32cbc081d0cc64ff4d466c654084a204dcb
});



<<<<<<< HEAD
router.post("/signup", function(req,res) {
	User.create({
		username: req.body.username,
		password: req.body.password,
	})
	.then(function() {
		res.redirect("/user/login");
	})
	.catch(function(err) {
		renderTemplate(req, res, "signup", "Signup", {
			error: "Please ensure all fields are filled in properly",
		});
	});
});
=======


>>>>>>> 2a84b32cbc081d0cc64ff4d466c654084a204dcb


module.exports = router;
