/* globals $*/

$(document).ready(function() {

	let $deleteButtons = $(".photos-delete");

	$deleteButtons.on("click", function(ev) {
		let $btn = $(ev.target);
		let photoId = $btn.data("photoid");


		$.ajax("/api/photo/" + photoId, {
			method: "DELETE",
			success: function() {
				$("[data-photoId=" + photoId + "]").remove();
			},
			error: function() {
				alert("Unable to delete photo");
			},
		});
	});
});
