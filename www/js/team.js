function loadTeams() {
	$("#teamlist").html("");
	Q = 'SELECT * FROM Team;';
	act_on_results(Q, function(row) { 
		$('#teamlist').append('<li class="forward"><a href="#team">' + row.season + ' ' + row.name + '</a></li>'); 
	});
	//log("Teams loaded");
}

function newTeam(team_name, season, sport) {
	Q = "INSERT INTO Team (name, season, sport) VALUES ('" + team_name + "', '" + season + "', '" + sport + "')";
	query(Q);
	//log("Created new team: " + team_name);
}

function createTeamTable() {
	//set up team table on a blank DB
	Q = "CREATE TABLE IF NOT EXISTS Team(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, season TEXT NOT NULL, sport TEXT NOT NULL)";
	query(Q);
}

if (reset == true) {
	query("DROP TABLE IF EXISTS Team");
}
createTeamTable(); //always call this in case there's no team table

if (reset == true) {
	newTeam("Cubs", "2012", "baseball");
	newTeam("Celtics", "2013", "basketball");
}

loadTeams();
