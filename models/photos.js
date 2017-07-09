const sql = require("../utility/sql");
const Sequelize = require("sequelize");
const Tags = require("./tags");
const Comments = require("./comments");
const Likes = require("./likes");

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
});


Photos.prototype.getThumbnailSrc = function() {
	// Check if I have a thumbnail available in assets/thumbnails!
	// Otherwise return this default icon
	const filePath = "/thumbnails/" + this.get("id") + ".jpg";
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
	const filePath = "/previews/" + this.get("id") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	return null;
};

Tags.belongsToMany(Photos, { through: "photos_tags" });
Photos.belongsToMany(Tags, { through: "photos_tags" });
Photos.hasMany(Comments);
Photos.hasMany(Likes);

module.exports = Photos;
