const sql = require("../utility/sql");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Photos = require("./photos");
const Comments = require("./comments");

function hashUserPassword(user) {
	if (user.password) {
	return bcrypt.genSalt()
		.then(function(salt) {
			console.log(salt);
			return bcrypt.hash(user.password, salt);
		}).then(function(hashedPW) {
			user.password = hashedPW;
		});
	}
}


const User = sql.define("user", {
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
		type: Sequelize.STRING(1000),
		notNull: true,
	},
}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	},
});

User.prototype.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.get("password"));
};

User.hasMany(Photos);
User.hasMany(Comments);

module.exports = User;
