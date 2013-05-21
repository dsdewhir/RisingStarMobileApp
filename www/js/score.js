function addOne(game_id, stat, inning) {
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND field = '" + stat + "' AND inning = " + inning;
	log(Q);
	act_on_results(Q, function(row) {
		Qtoo = "UPDATE Score SET amt=amt+1 WHERE id = " + row.id;
		query(Qtoo);
	}, function() {
		newScore(game_id, stat, inning, 1);
	});
}

function minusOne(game_id, stat, inning) {
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND field = '" + stat + "' AND inning = " + inning;
	log(Q);
	act_on_results(Q, function(row) {
		Qtoo = "UPDATE Score SET amt=amt-1 WHERE id = " + row.id;
		query(Qtoo);
	}, function(){ console.log("No results"); });
}

function showScores(game_id, sport, inning) {
	updateCurrentSport(currentTeam);
	sport = currentSport; //ignore passed variable, so remove it from arguments
	if (sport == "baseball") {
		loadBaseballScores(game_id, inning);
	} else if (sport == "basketball") {
		loadBasketballScores(game_id, inning);
	}
}

function updateCurrentSport(game_id) {
	/*
	Q = "SELECT team_id FROM Game WHERE id = " + game_id;
	act_on_results(Q, function(row) {
		update_sport(row.team_id);
		log("TeamId: " + row.team_id);
	});
	*/
	
	function update_sport(team_id) {
		Qx = "SELECT * FROM Team WHERE id = " + team_id;
		act_on_results(Qx, function(row) {
			currentSport = row.sport;
			log(currentSport);
		});
	}
	
	update_sport(game_id);
}

function createScoreTable() {
	//set up team table on a blank DB
	Q = "CREATE TABLE IF NOT EXISTS Score(id INTEGER NOT NULL PRIMARY KEY, game_id INTEGER NOT NULL, field TEXT NOT NULL, inning INTEGER NOT NULL, amt INTEGER NOT NULL)";
	query(Q);
}

function newScore(game_id, field, inn, amt) {
	Q = "INSERT INTO Score (game_id, field, inning, amt) VALUES (" + game_id + ", '" + field + "', " + inn + ", " + amt + " )";
	query(Q);
}

if (reset == true) {
	query("DROP TABLE IF EXISTS Score");
}
createScoreTable(); //always call this in case there's no team table

if (reset == true) {
	newScore(currentGame, "single", currentInning, 7);
	newScore(currentGame, "double", currentInning, 0);
	newScore(currentGame, "triple", currentInning, 0);
	newScore(currentGame, "homerun", currentInning, 0);
	newScore(currentGame, "walk", currentInning, 0);
	newScore(currentGame, "strikeout", currentInning, 0);
	newScore(currentGame, "steal", currentInning, 0);
}

showScores(currentGame, "baseball", currentInning);