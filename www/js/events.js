//Event handlers for different button clicks

$(document).ready(function() {
	$("#saveplayer").click(function() {
		newPlayer($("#player_name").val());
		log("Saved new player");
	});
});
