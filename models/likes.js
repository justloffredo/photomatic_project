const Sequelize = require("sequelize");
const sql = require("../utility/sql");


const Likes = sql.define("like", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

module.exports = Likes;
