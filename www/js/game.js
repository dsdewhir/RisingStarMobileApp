function loadGames(team_id) {
	$("#gamelist").html("<li class='empty'>No games found.</li>");
	Q = "SELECT * FROM Game WHERE team_id = '" + team_id + "';";
	act_on_results(Q, function(row) { 
		$("#gamelist .empty").remove();
		opponent = (row.at_home == 0) ? "Away @" : "Home vs ";
		opponent += row.opponent;
		$('#gamelist').append('<li class="forward"><a href="#game">' + opponent + ' ' + row.date + '</a></li>'); 
	});
	
}

function scoreShow(team_id) {
	//loadify all teh scores!
	log("Loading scores");
}

function newGame(team_id, opponent, sport, date, at_home) {
	Q = "INSERT INTO Game (team_id, opponent, sport, date, at_home) VALUES ('" + team_id + "', '" + opponent + "', '" + sport + "', '2013-05-15', " + at_home + ")";
	query(Q);
	log("Created new game vs: " + opponent);
}

function createGameTable() {
	//id
	//team_id
	//opponent
	//sport
	//date
	//at_home
	Q = "CREATE TABLE IF NOT EXISTS Game(id INTEGER NOT NULL PRIMARY KEY, team_id TEXT NOT NULL, opponent TEXT NOT NULL, sport TEXT NOT NULL, date TEXT NOT NULL, at_home BOOLEAN NOT NULL)";
	query(Q);
}

if (reset == true) {
	query("DROP TABLE IF EXISTS Game");
}
createGameTable(); //always call this in case there's no game table (first load)

if (reset == true) {
	newGame(currentTeam, "Bobcats", "baseball", "14124", 0);
}

loadGames(currentTeam);
scoreShow(currentGame);
