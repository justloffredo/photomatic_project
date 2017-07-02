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

router.post("/login", function(req, res) {
	User.findOne({
		where: {
			username: req.body.username,
		},
	})
	.then(function(user) {
		console.log(user.password);
		console.log(req.body.password);

		if (user) {
			user.comparePassword(req.body.password)
				.then(function(valid) {
					if (valid) {
						req.session.user = user;
						res.redirect("/");
					}
					else {
						renderTemplate(res, "login", "Login", {
							error: "Incorrect password",
						});
					}
				})
				.catch(function(err) {
					console.log(err);
				});
		}
		else {
			renderTemplate(res, "login", "Login", {
				error: "Username not found",
			});
		}
	})
	.catch(function(err) {
			console.log(err);
			renderTemplate(res, "login", "Login", {
				error: "Your database has gone to shit",
			});
		});
	});


router.get("/signup", function(req, res, error) {
	renderTemplate(res, "signup", "Signup", {
<<<<<<< HEAD
=======
	});
});
>>>>>>> justin-userauthentication


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


module.exports = router;
