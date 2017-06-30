const sql = require("../utility/sql");
const Sequelize = require("sequelize");
const Photos = require("./photos");
const Comments = require("./comments");
const Photos = require("./photos");

const Users = sql.define("user", {
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

Users.hasMany(Photos);
Users.hasMany(Comments);

module.exports = Users;
