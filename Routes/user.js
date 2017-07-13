const express = require("express");
const User = require("../models/users.js");
const renderUserTemp = require("../utility/renderauth.js");
const requireLoggedOut = require("../middleware/requireLoggedOut");

const router = express.Router();
// router.use(requireLoggedOut);




router.get("/signup", function(req, res, error) {
	renderUserTemp(res, "signup", "Signup", {
	});
});

router.post("/signup", function(req, res) {
			User.signup(req)
			.then(function() {
				res.redirect("/user/login");
			})
			.catch(function(err) {
				res.status(400);
				renderUserTemp(res, "signup", "Signup", {
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
			req.session.user;
			res.redirect("/photo/upload");
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
