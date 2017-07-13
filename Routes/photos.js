const express = require ("express");
const router = express.Router();
const User = require("../models/users.js");
const Photos = require("../models/photos.js");
const renderTemplate = require("../utility/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");
const requireLoggedIn = require("../middleware/requireLoggedIn");


const Sequelize = require("sequelize");


const uploader = multer({ dest: "uploads/" });
router.use(requireLoggedIn);



router.get("/gallery", function(req, res) {
	Photos.findAll().then(function(photos) {
		renderTemplate(res, "gallery", "Gallery", {
			photos: photos,
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
		return renderTemplate(req, res, "Upload a File", "upload", {
			error: "You must choose a file to upload",
		});
	}

	// Otherwise, try an upload
	req.user.upload(req.file, req.body.description).then(function() {
		res.redirect("/preview?success=1");
	})
	.catch(function(err) {
		console.error("Something went wrong with upload", err);
		renderTemplate(req, res, "Upload a File", "upload", {
			error: "Something went wrong, please try a different file",
		});
	});
});



router.get("/photo/:fileId", function(req, res) {
	Photos.findById(req.params.photoId).then(function(file) {
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
