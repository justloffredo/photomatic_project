/* globals $*/

$(document).ready(function() {

	let $deleteButtons = $(".delete-button");

	$deleteButtons.on("click", function(ev) {
		console.log("clicked");
		let $btn = $(ev.target);
		let photoId = $btn.data("photoid");


		$.ajax("/api/photo/" + photoId, {
			method: "DELETE",
			success: function() {
				$("[data-photoid=" + photoId + "]").remove();
				window.location="/photo/gallery";

			},
			error: function() {
				alert("Unable to delete photo");
			},
		});
	});
});
