//Event handlers for different button clicks

$(document).ready(function() {
	$("#saveplayer").click(function() { 
		newPlayer($("#player_name").val()) 
		loadPlayers();
	});
	$("#saveteam").click(function() { 
		newTeam($("#team_name").val(),
				$("#season").val(),
				$("#sport").val()); 
		loadTeams();
	});
});
