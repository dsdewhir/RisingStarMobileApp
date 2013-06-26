//Event handlers for different button clicks

$(document).ready(function() {
	$("#teamlist li a").live("click", function() {	//team is selected
		var team_id = $(this).find("input").val();
		for (var i = 0; i < currentPlayer.teams.length; i++) {
			if (currentPlayer.teams[i].id == team_id) {
				currentTeam = currentPlayer.teams[i];
			}
		}
		$("#team h1").text($(this).text());;
		clear_items($("#gamelist"));
		load_items(currentTeam.games);
	});
	
	$("#playerlist li a").live("click", function() {	//player is selected
		var player_id = $(this).find("input").val();
		for (var i = 0; i < playersearch.players.length; i++) { //find the proper player
			if (playersearch.players[i].id == player_id) {
				currentPlayer = playersearch.players[i]; //set the player to currentPlayer
			}
		}
		$("#player h1").text($(this).text());
		load_items(currentPlayer.teams);
	});
	
	$("#gamelist li a").live("click", function() {
		resetAllStats();
		currentGame = $(this).find("input").val();
		currentInning = 1;
		$(".button.inning").removeClass("selected");
		$(".button.inning input[value=" + String(currentInning) + "]").parent().addClass("selected");
		updateCurrentSport(currentTeam); //need to set the sport here, dont we?
		log("#" + currentSport + "game h1");
		$("#" + currentSport + "game h1").text($(this).text());
		showScores(currentGame, currentSport, currentInning);
	});
	
	$("#saveplayer").click(function() {		//save a new player
		var p = new Player(0, $("#player_name").val());
		clear_items($("#playerlist"));
		playersearch.find([], function() { setTimeout('load_items(playersearch.players)', 500); });
		//setTimeout('load_items(playersearch.players)', 300);
	});
	
	$("#saveteam").click(function() {		//save a new team
		newTeam($("#team_name").val(),
				currentPlayer,
				$("#season").val(),
				$("#sport").val()); 
	});
	
	$("#savegame").click(function() {
		//updateCurrentSport(currentTeam);
		var at_home = ($("input[name=homeaway]:checked").val() == "home") ? 1 : 0;
		newGame(currentTeam,
				$("#gameopponent").val(),
				currentSport,
				$("#gamedate").val(),
				at_home);
	});
	$(".inning").live("click", function() {
		resetAllStats();
		currentInning = parseInt($(this).find("input").val());
		$(".button.inning").removeClass("selected");
		$(".button.inning input[value=" + String(currentInning) + "]").parent().addClass("selected");
		showScores(currentGame, currentSport, currentInning);
	});
	$("#statshow-baseball").live("click", function() {
		loadBaseballStats(currentGame);
	});
	$("#statshow-basketball").live("click", function() {
		loadBasketballStats(currentGame);
	});
	$("#team-stats-link").live("click", function() {
		loadTeamStats(currentTeam, currentSport);
	});
	/*
	$("#playerphoto").bind("tap", function() {
		var options = {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType:Camera.DestinationType.FILE_URI, quality:50};
		navigator.Camera.getPicture(onCameraSuccess, onCameraError, options);
	});
	*/
});

function onCameraError(message) {
	log(message);
}

function onCameraSuccess(imageURI) {
	$("#imagebox").attr("src", imageURI);
}
