//Event handlers for different button clicks

$(document).ready(function() {
	$("#teamlist li a").live("click", function() {	//player is selected
		currentTeam = $(this).find("input").val();
		updateCurrentSport(currentTeam);
		$("#team h1").text($(this).text());;
		//$("#team-stats-link").attr("href", "#show-" + currentSport); //this needs to be fixed for async
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
		currentInning = 1;
		$(".button.inning").removeClass("selected");
		$(".button.inning input[value=" + String(currentInning) + "]").parent().addClass("selected");
		updateCurrentSport(currentTeam); //need to set the sport here, dont we?
		log("#" + currentSport + "game h1");
		$("#" + currentSport + "game h1").text($(this).text());
		showScores(currentGame, currentSport, currentInning);
	});
	$("#saveplayer").click(function() {		//save a new player
		newPlayer($("#player_name").val());
	});
	$("#saveteam").click(function() {		//save a new team
		newTeam($("#team_name").val(),
				currentPlayer,
				$("#season").val(),
				$("#sport").val()); 
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
		$(".button.inning").removeClass("selected");
		$(".button.inning input[value=" + String(currentInning) + "]").parent().addClass("selected");
		log("Inning: " + currentInning);
		showScores(currentGame, currentSport, currentInning);
	});
	$("#statshow-baseball").live("click", function() {
		loadBaseballStats(currentGame);
	});
	$("#statshow-basketball").live("click", function() {
		loadBasketballStats(currentGame);
	});
	$("#team-stats-link").live("click", function() {
		loadBaseballTeamStats(currentTeam);
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
