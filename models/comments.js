const Sequelize = require("sequelize");
const sql = require("../utility/sql");
const commentLikes = require("./commentLikes");

const Comments = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING(250),
		notNull: true,
	}

})

Comments.hasMany(commentLikes);

module.exports = Comments;
