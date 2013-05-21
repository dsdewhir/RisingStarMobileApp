function addOne(game_id, stat) {
	log("addOne:" + game_id + stat);
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND field = '" + stat + "'";
	log(Q);
	act_on_results(Q, function(row) {
		log("Have a result");
		Qtoo = "UPDATE Score SET amt=amt+1 WHERE id = " + row.id;
		query(Qtoo);
	});
}

function minusOne(game_id, stat) {
	log("minusOne:" + game_id + stat);
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND field = '" + stat + "'";
	log(Q);
	act_on_results(Q, function(row) {
		log("Have a result");
		Qtoo = "UPDATE Score SET amt=amt-1 WHERE id = " + row.id;
		query(Qtoo);
	});
}

function showScores(game_id, sport) {
	log("showScores()" + game_id + sport);
	if (sport == "baseball") {
		loadBaseballScores(game_id);
	} else if (sport == "basketball") {
		loadBasketballScores(game_id);
	}
}

function createScoreTable() {
	//set up team table on a blank DB
	Q = "CREATE TABLE IF NOT EXISTS Score(id INTEGER NOT NULL PRIMARY KEY, game_id INTEGER NOT NULL, field TEXT NOT NULL, inn INTEGER NOT NULL, amt INTEGER NOT NULL)";
	query(Q);
}

function newScore(game_id, field, inn, amt) {
	Q = "INSERT INTO Score (game_id, field, inn, amt) VALUES (" + game_id + ", '" + field + "', " + inn + ", " + amt + " )";
	query(Q);
	//log("INSERTED a new Score");
}

if (reset == true) {
	query("DROP TABLE IF EXISTS Score");
}
createScoreTable(); //always call this in case there's no team table

if (reset == true) {
	newScore(currentGame, "single", 1, 7);
	newScore(currentGame, "double", 1, 0);
	newScore(currentGame, "triple", 1, 0);
	newScore(currentGame, "homerun", 1, 0);
	newScore(currentGame, "walk", 1, 0);
	newScore(currentGame, "strikeout", 1, 0);
	newScore(currentGame, "steal", 1, 0);
}

showScores(currentGame, "baseball");
