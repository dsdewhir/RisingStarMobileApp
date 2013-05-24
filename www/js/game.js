function loadGames(team_id) {
	$("#gamelist").html("<li class='empty'>No games found.</li>");
	Q = "SELECT * FROM Game WHERE team_id = '" + team_id + "';";
	act_on_results(Q, function(row) { 
		$("#gamelist .empty").remove();
		opponent = (row.at_home == 0) ? "@ " : "vs ";
		opponent += row.opponent;
		$('#gamelist').append('<li class="forward"><a href="#' + row.sport + 'game">' + opponent + ' <span class="gamedate">' + row.date + '</span><input type="hidden" value="' + row.id + '"</a></li>'); 
	}, function() { console.log("No results"); });
	
}

function scoreShow(team_id) {
	//loadify all teh scores!
	log("Loading scores");
}

function newGame(team_id, opponent, sport, date, at_home) {
	Q = "INSERT INTO Game (team_id, opponent, sport, date, at_home) VALUES ('" + team_id + "', '" + opponent + "', '" + sport + "', '" + date + "', " + at_home + ")";
	query(Q);
	//log("Created new game vs: " + opponent);
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
	newGame(currentTeam, "Bobcats", "baseball", "Mar 5, 2012", 0);
}

loadGames(currentTeam);
scoreShow(currentGame);
