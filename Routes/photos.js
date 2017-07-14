const express = require ("express");
const router = express.Router();
const User = require("../models/users.js");
const Photo = require("../models/photos.js");
const renderTemplate = require("../utility/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const Sequelize = require("sequelize");

const uploader = multer({ dest: "uploads/" });
router.use(requireLoggedIn);

router.get("/gallery", function(req, res) {
	Photo.findAll().then(function(photos) {
		renderTemplate(res, "gallery", "Gallery", {
			username: req.user.get("username"),
			photos: photos,
		});
	});
});

router.get("/preview/:photoId", function(req, res) {
	Photo.findById(req.params.photoId).then(function(photo) {
		renderTemplate(res, "preview", "Preview", {
			username: req.user.get("username"),
			photo: photo,
		});
	});
});

// upload photo
// Render an upload form that POSTs to /docs/upload
router.get("/upload", function(req, res) {
	// renderTemplate(req, res, "Upload a File", "upload");
	renderTemplate(res, "upload", "Upload", {
	});
});

// Upload the form at GET /upload
router.post("/upload", uploader.single("file"), function(req, res) {
	// Make sure they sent a file
	if (!req.file) {
		return renderTemplate(res, "upload", "Upload", {
			error: "You must choose a file to upload",
		});
	}

	// Otherwise, try an upload
	req.user.upload(req.file).then(function() {
		res.redirect("preview");
	})
	.catch(function(err) {
		console.error("Something went wrong with upload", err);
		renderTemplate(res, "upload", "Upload", {
			error: "Something went wrong, please try a different file",
		});
	});
});

// Render an individual document
router.get("/photo/preview/:photoId", function(req, res) {
	Photo.findById(req.params.photoId).then(function(photo) {
		if (photo) {
			renderTemplate(res, "preview", photo.get("name"), {
				photo: photo,
			});
		}
		else {
			res.status(404);
			renderTemplate(res, "404", "Not Found");
		}
	})
	.catch(function(err) {
		console.error("Error while fetching file " + req.params.photoId, err);
		res.status(500).send("Something went wrong!");
	});
});

// Download a document, if it exists
router.get("/download/:photoId", function(req, res) {
	Photo.findById(req.params.photoId).then(function(file) {
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
