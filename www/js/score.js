function addOne(game_id, stat, inning) {
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND field = '" + stat + "' AND inning = " + inning;
	act_on_results(Q, 
					function(row) {
						Qtoo = "UPDATE Score SET amt=amt+1 WHERE id = " + row.id;
						query(Qtoo, function() { showScores(game_id, "none", inning); });
					}, 
					function() {
						newScore(game_id, stat, inning, 1, function() { showScores(game_id, "none", inning); });
					}
	);
}

function minusOne(game_id, stat, inning) {
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND field = '" + stat + "' AND inning = " + inning;
	act_on_results(Q, function(row) {
		Qtoo = "UPDATE Score SET amt=amt-1 WHERE id = " + row.id;
		query(Qtoo, function() {
			showScores(game_id, "none", inning);
		});
	}, function(){ console.log("No results"); });
}

function showScores(game_id, sport, inning) {
	log("function showScores");
	updateCurrentSport(currentTeam);
	sport = currentSport; //ignore passed variable, so remove it from arguments
	if (sport == "baseball") {
		loadBaseballScores(game_id, inning);
	} else if (sport == "basketball") {
		loadBasketballScores(game_id, inning);
	}
}

function updateCurrentSport(team) {
	currentSport = team.sport;	
}

function createScoreTable() {
	//set up team table on a blank DB
	Q = "CREATE TABLE IF NOT EXISTS Score(id INTEGER NOT NULL PRIMARY KEY, game_id INTEGER NOT NULL, field TEXT NOT NULL, inning INTEGER NOT NULL, amt INTEGER NOT NULL)";
	query(Q);
}

function newScore(game_id, field, inn, amt, callback_function) {
	Q = "INSERT INTO Score (game_id, field, inning, amt) VALUES (" + game_id + ", '" + field + "', " + inn + ", " + amt + " )";
	query(Q, callback_function);
}

function resetAllStats() {
	log("function resetAllStats");
	$("#statlist li small").text(0)
	resetBaseballStats();
	resetBasketballStats();
}

function loadTeamStats(team) {
	if (team.sport == "baseball") {
		loadBaseballTeamStats(team.id);
	} else if (team.sport == "basketball") {
		loadBasketballTeamStats(team.id);
	}
}

if (reset == true) {
	query("DROP TABLE IF EXISTS Score");
}
createScoreTable(); //always call this in case there's no team table

if (reset == true) {
	newScore(1, "single", 1, 7);
	newScore(1, "double", 1, 0);
	newScore(1, "triple", 1, 0);
	newScore(1, "homerun", 1, 0);
	newScore(1, "walk", 1, 0);
	newScore(1, "strikeout", 1, 0);
	newScore(1, "steal", 1, 0);
	newScore(2, "single", 1, 1);
}
