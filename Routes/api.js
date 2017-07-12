const express = require("express");
const User = require("../models/users.js");
const renderTemplate = require("../utility/renderTemplate.js");
const router = express.Router();

router.post("/signup", function(req,res) {
	User.signup(req)
			.then(function(user) {
				res.json ({
					user : user
				});
			})
			.catch(function(err) {
				console.error("Encountered an error during the API signup");
				res.status(400);
				res.json({
					error: "Please ensure all fields are filled in properly" });
			});
});


router.get("/login", function(req, res) {
	renderTemplate(res, "login", "Login", {
	});
});

router.post("/login", function(req, res) {
		User.login(req)
		.then(function(user) {
			res.json({ user: user });
		})
		.catch(function(err) {
			console.error("Encountered an error during the API login");
			res.status(400);
			res.json({
				error: "Invalid username or password"});
		});
	});

	router.get("/logout", function(req, res) {
			req.session.userid = null;
			req.user = null;

			console.log(req.session);
			res.redirect("/");
	});







module.exports = router;
