function renderTemplate(res, page, title, args, links) {
	return res.render("template", {
		page: page,
		title: title,
		args: args,
		
	});
}

module.exports = renderTemplate;
