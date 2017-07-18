const Photos = require("../models/photos.js");
const renderTemplate = require("./renderTemplate.js");

function renderPhoto(res, photoId) {
	let photo;
	let comments;
	let likes;

	Photos.findById(photoId)
		.then(function(foto) {
			if(foto) {
				photo = foto;
				console.log(photo);
				return photo.getComments();
			}
			else {
				throw new Error("Missing Photo!");
			}
		})
		.then(function(com) {
			comments = com;
			return photo.getLikes();
			})
		.then(function(like) {
			for (let i = 0; i < like.length; i++) {
				likes = i + 1;
			}
			renderTemplate(res, "photo", "Photo", {
				photo: photo,
				comments: comments,
				likes: likes,
			});
		})
		.catch(function(err) {
			console.log(err);
			res.status(404);
		});
}

module.exports = renderPhoto;
