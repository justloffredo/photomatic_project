const sql = require("../utility/sql");
const Sequelize = require("sequelize");

module.exports = sql.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: Sequelize.STRING(100),
		notNull: true,
	},
	password: {
		type: Sequelize.STRING(100),
		notNull: true,
	},

});
