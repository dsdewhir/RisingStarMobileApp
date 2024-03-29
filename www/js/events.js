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
		clear_items($("#gamelist"), function() {
			load_items(currentTeam.games);
		});
		if(currentTeam.games.length < 1) {
			$("#team-stats-link").hide();
		} else {
			$("#team-stats-link").attr("href", "#show-" + currentTeam.sport)
			$("#team-stats-link").show();
		}
	});
	
	$("#playerlist li a").live("click", function() {	//player is selected
		var player_id = $(this).find("input").val();
		for (var i = 0; i < playersearch.players.length; i++) { //find the proper player
			if (playersearch.players[i].id == player_id) {
				currentPlayer = playersearch.players[i]; //set the player to currentPlayer
			}
		}
		$("#player h1").text($(this).text());
		clear_items($("#teamlist"), function() { 
			load_items(currentPlayer.teams);
		});
	});
	
	$("#gamelist li a").live("click", function() {
		resetAllStats();
		currentGame = $(this).find("input").val();
		currentInning = 1;
		$(".button.inning").removeClass("selected");
		$(".button.inning input[value=" + String(currentInning) + "]").parent().addClass("selected");
		updateCurrentSport(currentTeam); //need to set the sport here, dont we?
		$("#" + currentSport + "game h1").text($(this).text());
		showScores(currentGame, currentSport, currentInning);
		$("#show-" + currentTeam.sport + " a.goback").attr("href", "#" + currentTeam.sport + "game");
	});
	
	$("#saveplayer").click(function() {		//save a new player
		var p = new Player(0, $("#player_name").val(), $("#player_photo").attr("src"));
		clear_items($("#playerlist"));
		playersearch.find([], function() { setTimeout('load_items(playersearch.players)', 500); });
		//setTimeout('load_items(playersearch.players)', 300);
	});
	
	$("#saveteam").click(function() {		//save a new team
		var t = new Team(0, $("#team_name").val(),
				currentPlayer.id,
				$("#season").val(),
				$("#sport").val(),
				$("#team_logo").attr("src")); 
		currentPlayer.teams.push(t);
		t.listInsert();
	});
	
	$("#savegame").click(function() {
		//updateCurrentSport(currentTeam);
		var at_home = ($("input[name=homeaway]:checked").val() == "home") ? 1 : 0;
		var g = new Game(0, currentTeam.id,
				$("#gameopponent").val(),
				currentTeam.sport,
				$("#gamedate").val(),
				at_home);
		currentTeam.games.push(g);
		g.listInsert();
	});
	$(".inning").live("click", function() {
		resetAllStats();
		currentInning = parseInt($(this).find("input").val());
		$(".button.inning").removeClass("selected");
		$(".button.inning input[value=" + String(currentInning) + "]").parent().addClass("selected");
		showScores(currentGame, currentSport, currentInning);
	});
	$("#inningadd").live("click", function() {
		resetAllStats();
		var setInning = parseInt($("#inningvalue").val());
		log(setInning);
		max_inning = 9;
		if(currentSport == "basketball") {
			max_inning = 4;
		}
		if (setInning < max_inning) {
			setInning += 1;
		}
		currentInning = setInning;
		$("#inningvalue").val(setInning);
		$("#inningvalue").val(setInning);
		$("a.button.inning.ninth").text(setInning);
		showScores(currentGame, currentSport, currentInning);
	});
	$("#inningminus").live("click", function() {
		resetAllStats();
		var setInning = parseInt($("#inningvalue").val());
		log(setInning);
		if (setInning > 1) {
			setInning -= 1;
		}
		currentInning = setInning;
		$("#inningvalue").val(setInning);
		$("#inningvalue").val(setInning);
		$("a.button.inning.ninth").text(setInning);
		showScores(currentGame, currentSport, currentInning);
	});
	$("#statshow-baseball").live("click", function() {
		loadBaseballStats(currentGame);
		$("#show-baseball h2").text(currentPlayer.name + "'s Stats");
		var game = new Game(currentGame);
		execute_after_set(game, "value.date", function() {
			$("li#baseball-team-info").html(currentTeam.name + "<br>" + game.date);
		});
	});
	$("#statshow-basketball").live("click", function() {
		$("#show-basketball h2").text(currentPlayer.name + "'s Stats");
		loadBasketballStats(currentGame);
		var game = new Game(currentGame);
		execute_after_set(game, "value.date", function() {
			$("#show-basketball li#baseball-team-info").html(currentTeam.name + "<br>" + game.date);
		});
	});
	$("#team-stats-link").live("click", function() {
		resetAllStats();
		loadTeamStats(currentTeam);
		$("#show-" + currentTeam.sport + " a.goback").attr("href", "#team");
		$("#show-" + currentTeam.sport + " h2").text(currentPlayer.name + "'s Stats");
		$("#show-" + currentTeam.sport + " li#baseball-team-info").html(currentTeam.name);
	});
	/*
	$("#playerphoto").bind("tap", function() {
		var options = {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType:Camera.DestinationType.FILE_URI, quality:50};
		navigator.Camera.getPicture(onCameraSuccess, onCameraError, options);
	});
	*/
	
	$(".saveclear").click(function() { $("input[type=text]").val(""); });
	$("#player_photo").click(function() { getPicture(); });
	$("#team_logo").click(function() { getLogo(); });

	$("#gamedate").click(function() {
		openBirthDate();
	});
	$("#sw-cancel").live("click", function() {
		log("cancel");
		SpinningWheel.close();
	});
	$("#sw-done").live("click", function() {
		log("done");
		var results = SpinningWheel.getSelectedValues();
		var month = results['values'][1];
		var day = results['values'][2];
		var year = results['values'][0];
		$("#gamedate input").val(month + " " + day + ", " + year);
		SpinningWheel.close();
	});
});
