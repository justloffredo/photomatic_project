const sql = require("../utility/sql");
const Sequelize = require("sequelize");
const Tags = require("./tags");
const Comment = require("./comments");
const Like = require("./likes");
const User = require("./users.js");


const fs = require("fs");


const Photos = sql.define("photo", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	size: {
		type: Sequelize.INTEGER,
		notNull: true,
	},
	originalName: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mimeType: {
		type: Sequelize.STRING,
		notNull: true,
	},
	description: {
		type: Sequelize.STRING(150),
	},
	filename: {
		type: Sequelize.STRING,
		notNull: true,
	},


});


Photos.prototype.getThumbnailSrc = function() {
	// Check if I have a thumbnail available in assets/thumbnails!
	// Otherwise return this default icon
	const filePath = "/thumbnails/" + this.get("filename") + ".jpg";
	console.log(filePath);
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	else {
		return "/icons/file.svg";
	}
};

Photos.prototype.getPreviewSrc = function() {
	// Check if I have a preview available in assets/previews!
	// Otherwise return null, to display a "no preview" message
	const filePath = "/previews/" +  this.get("filename") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	return null;
};

Photos.prototype.Like = function(req,photoId) {
	return Like.upsert({
		userid: req.session.userid,
		photoId: photoId,
	})
	.then(function(like) {
		if (like) {
			// res.status(200);
			// res.send("Successfully stored");
			return 0;
		}
		else {
			console.log("Else statement");
			// res.status(200);
			// res.send("Successfully inserted");
		}
	});
};

// Photos.findAll({includes: [Lke]}).then(data=>console.log(data));

Tags.belongsToMany(Photos, { through: "photos_tags" });
Photos.belongsToMany(Tags, { through: "photos_tags" });
Photos.hasMany(Comment);
Photos.hasMany(Like);

module.exports = Photos;
