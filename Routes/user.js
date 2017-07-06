const express = require("express");
const User = require("../models/users.js");
const renderTemplate = require("../utility/renderTemplate.js");
const router = express.Router();

router.get("/signup", function(req, res, error) {
	renderTemplate(res, "signup", "Signup", {
	});
});

router.post("/signup", function(req,res) {
			User.create({
				username: req.body.username,
				password: req.body.password,
			})
			.then(function(user) {
				req.session.userid = user.id;
				res.redirect("/");
			})
			.catch(function(err) {
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
		User.findOne({
			where: {
				username: req.body.username,
			},
		})
		.then(function(user) {
			if (user) {
				user.comparePassword(req.body.password).then(function(valid) {
						if (valid) {
							req.session.userid = user.get("id");
							res.redirect("/");
						}
						else {
							renderTemplate(req, res, "login", "Login", {
								error: "Incorrect password",
							});
						}
				});
			}
			else {
				renderTemplate(res, "login", "Login", {
				error: "Username not found. Have you signed up for an account?",
				});
			}
	})
		.catch(function(err) {
			console.log(err);
			renderTemplate(req, res, "login", "Login", {
				error: "Something has gone wrong with your database",
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
