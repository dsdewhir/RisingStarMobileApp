function Team (name, player_id, season, sport) {
	this.name = 		name;
	this.player_id = 	player_id;
	this.season = 		season;
	this.sport = 		sport;

	this.save = save;
	function save(cb) {
		Q = "UPDATE Team SET name='" + this.name + "', player_id='" + this.player_id + "', season='" + this.season + "', sport='" + this.sport + "' WHERE id=" + this.id;	
		query(Q);
		cb();
	}
	
	this.create = create;
	function create(cb) {
		Q = "INSERT INTO Team (name, player_id, season, sport) VALUES ('" + this.name + "', '" + this.player_id + "', '" + this.season + "', '" + this.sport + "')";
		log(Q);
		query(Q, function(tx, results) {
			this.id = results.insertId;
		});
		cb();
	}
}


function loadTeams(player_id) {
	$("#teamlist").html("<li class='empty'>No teams found.</li>");
	Q = 'SELECT * FROM Team WHERE player_id = ' + player_id + ';';
	act_on_results(Q, function(row) { 
		$("#teamlist .empty").remove();
		$('#teamlist').append('<li class="forward"><a href="#team">' + row.season + ' ' + row.name + '<input type="hidden" value="' + row.id + '" /></a></li>'); 
	}, function(){ console.log("No results"); });
	//log("Teams loaded");
}

function newTeam(team_name, player_id, season, sport) {
	Q = "INSERT INTO Team (name, player_id, season, sport) VALUES ('" + team_name + "', '" + player_id + "', '" + season + "', '" + sport + "')";
	query(Q, function() { loadTeams(player_id); });
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
