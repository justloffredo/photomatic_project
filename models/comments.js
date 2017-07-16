const Sequelize = require("sequelize");
const sql = require("../utility/sql");
const commentLikes = require("./commentLikes");

const Comment = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING,
		notNull: true,
	},

});

Comment.hasMany(commentLikes);

module.exports = Comment;
