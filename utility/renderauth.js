// const User = require("../models/users.js");


function renderUserTemp(res, page, title, args, links, error, username) {
	return res.render("usertemp", {
		page: page,
		title: title,
		args: args,
		error: error,
		username: username,
	});
}

module.exports = renderUserTemp;
