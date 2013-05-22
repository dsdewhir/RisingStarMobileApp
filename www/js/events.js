//Event handlers for different button clicks

$(document).ready(function() {
	$("#teamlist li a").live("click", function() {	//player is selected
		currentTeam = $(this).find("input").val();
		currentSport = updateCurrentSport(currentTeam);
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
	$("#gamelist li a").live("click", function() {
		currentGame = $(this).find("input").val();
		currentSport = updateCurrentSport(currentTeam); //need to set the sport here, dont we?
		$("#" + currentSport + "game h1").text($(this).text());
		showScores(currentGame, currentSport);
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
	$("#savegame").click(function() {
		updateCurrentSport(currentTeam);
		var at_home = ($("input[name=homeaway]:checked").val() == "home") ? 1 : 0;
		newGame(currentTeam,
				$("#gameopponent").val(),
				currentSport,
				$("#gamedate").val(),
				at_home);
		loadGames(currentTeam);
	});
	$(".inning").live("click", function() {
		currentInning = parseInt($(this).find("input").val());
		log("Inning: " + currentInning);
		showScores(currentGame, "baseball", currentInning);
	});
});
