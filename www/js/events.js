//Event handlers for different button clicks

$(document).ready(function() {
	$("#teamlist li a").live("click", function() {	//player is selected
		currentTeam = $(this).find("input").val();
		$("#team h1").text($(this).text());;
		//log("var currentPlayer = " + currentPlayer);
		loadGames(currentTeam);
	});
	$("#playerlist li a").live("click", function() {	//player is selected
		currentPlayer = $(this).find("input").val();
		$("#player h1").text($(this).text());;
		//log("var currentPlayer = " + currentPlayer);
		loadTeams(currentPlayer);
	});
	$("#saveplayer").click(function() {		//save a new player
		newPlayer($("#player_name").val()) 
		loadPlayers();
	});
	$("#saveteam").click(function() {		//save a new team
		newTeam($("#team_name").val(),
				currentPlayer,
				$("#season").val(),
				$("#sport").val()); 
		loadTeams(currentPlayer);
	});
});
