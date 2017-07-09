const express = require("express");
const User = require("../models/users.js");
const renderUserTemp = require("../utility/renderauth.js");
const router = express.Router();

router.get("/home", function(req, res, error) {
	renderUserTemp(res, "signup", "Signup", {
	});
});

router.get("/signup", function(req, res, error) {
	renderUserTemp(res, "signup", "Signup", {
	});
});

router.post("/signup", function(req,res) {
			User.signup(req)
			.then(function() {
				res.redirect("/profile");
			})
			.catch(function(err) {
				res.status(400);
				renderUserTemp(req, res, "signup", "Signup", {
					username: req.user,
					error: "Please ensure all fields are filled in properly",
				});
			});
		});


router.get("/login", function(req, res) {
	renderUserTemp(res, "login", "Login", {
	});
});

router.post("/login", function(req, res) {
	User.login(req)
		.then(function() {
			res.redirect("/");
		})
		.catch(function(err) {
			res.status(400);
			renderUserTemp(res, "login", "Login", {
				error: err.message,
			});
		});
});


router.get("/logout", function(req, res) {
	req.session.userid = null;
	req.user = null;
	console.log(req.session);
	res.redirect("/");
});







module.exports = router;
