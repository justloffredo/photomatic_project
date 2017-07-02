
require('dotenv').config();
const express = require ("express");
const router = express.Router();
const renderTemplate = require("../utility/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");
const User = require("../models/users.js");
const Sequelize = require("sequelize");

const Photo = require("../models/photos");
const uploader = multer({ dest: "uploads/" });


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

// upload photo
// Render an upload form that POSTs to /docs/upload
router.get("/upload", function(req, res) {
	// renderTemplate(req, res, "Upload a File", "upload");
	renderTemplate(res, "upload", "Upload", {
	});
});

// Upload the form at GET /docs/upload
router.post("/upload", uploader.single("file"), function(req, res) {
	// Make sure they sent a file
	if (!req.file) {
		return renderTemplate(req, res, "Upload a File", "upload", {
			error: "You must choose a file to upload",
		});
	}

	// Otherwise, try an upload
	// req.user.upload(req.file).then(function() {
	// 	res.redirect("/docs?success=1");
	// })
	// .catch(function(err) {
	// 	console.error("Something went wrong with upload", err);
	// 	renderTemplate(req, res, "Upload a File", "upload", {
	// 		error: "Something went wrong, please try a different file",
	// 	});
	// });
});

// Render an individual document
router.get("/doc/:fileId", function(req, res) {
	File.findById(req.params.fileId).then(function(file) {
		if (file) {
			renderTemplate(req, res, file.get("name"), "document", {
				file: file,
			});
		}
		else {
			res.status(404);
			renderTemplate(req, res, "Not Found", "404");
		}
	})
	.catch(function(err) {
		console.error("Error while fetching file " + req.params.fileId, err);
		res.status(500).send("Something went wrong!");
	});
});

// Download a document, if it exists
router.get("/download/:fileId", function(req, res) {
	File.findById(req.params.fileId).then(function(file) {
		if (file) {
			res.download("uploads/" + file.get("id"), file.get("originalName"));
		}
		else {
			res.status(404).send("No file found");
		}
	})
	.catch(function(err) {
		console.error(err);
		res.status(500).send("Something went wrong");
	});
});



module.exports = router;
