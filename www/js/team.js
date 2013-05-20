function loadTeams(player_id) {
	$("#teamlist").html("<li class='empty'>No teams found.</li>");
	Q = 'SELECT * FROM Team WHERE player_id = ' + player_id + ';';
	act_on_results(Q, function(row) { 
		$("#teamlist .empty").remove();
		$('#teamlist').append('<li class="forward"><a href="#team">' + row.season + ' ' + row.name + '<input type="hidden" value="' + row.id + '" /></a></li>'); 
	});
	//log("Teams loaded");
}

function newTeam(team_name, player_id, season, sport) {
	Q = "INSERT INTO Team (name, player_id, season, sport) VALUES ('" + team_name + "', '" + player_id + "', '" + season + "', '" + sport + "')";
	query(Q);
}

function createTeamTable() {
	//set up team table on a blank DB
	Q = "CREATE TABLE IF NOT EXISTS Team(id INTEGER NOT NULL PRIMARY KEY, player_id INTEGER NOT NULL, name TEXT NOT NULL, season TEXT NOT NULL, sport TEXT NOT NULL)";
	query(Q);
}

if (reset == true) {
	query("DROP TABLE IF EXISTS Team");
}
createTeamTable(); //always call this in case there's no team table

if (reset == true) {
	newTeam("Cubs", currentPlayer, "2012", "baseball");
	newTeam("Celtics", currentPlayer, "2013", "basketball");
}

loadTeams(currentPlayer);
