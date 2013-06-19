function Team (id, name, player_id, season, sport) {
	this.id = 			id;
	this.id_cached = 	id;
	this.list =			$("#teamlist");

	this.populate = populate;
	function populate() {
		Q = "SELECT * FROM Team WHERE id = " + this.id;
		log("POPULATE: " + Q);
		that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				log(results.rows.item(0));
				it = results.rows.item(0);
				that.name = it['name'];
				that.season = it['season'];
				that.player_id = it['player_id'];
				that.sport = it['sport'];
			});	
		}, errorHandler);
	}

	this.save = save;
	function save(cb) {
		Q = "UPDATE Team SET name='" + this.name + "', player_id='" + this.player_id + "', season='" + this.season + "', sport='" + this.sport + "' WHERE id=" + this.id;	
		query(Q);
		cb();
	}

	this.listInsert = listInsert;
	function listInsert() {
		this.list.append('<li class="forward"><a href="#team">' + this.season + ' ' + this.name + '<input type="hidden" value="' + this.id + '" /></a></li');
	}
	
	this.set_id = set_id;
	function set_id(element) {
		//We can't get an ID, but we can set one on the form
		if (this.id == 0 || this.id == "undefined") {
			that = this;
			setTimeout(function() { that.set_id(element); }, 100);
			return;
		}
		console.log(element + ": " + this.id);
	}
	
	this.create = create;
	function create(cb) {
		var that = this;
		Q = "INSERT INTO Team (name, player_id, season, sport) VALUES ('" + this.name + "', '" + this.player_id + "', '" + this.season + "', '" + this.sport + "')";
		log(Q);

		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				that.id = results.insertId;
			});	
		}, errorHandler);

		if (typeof(cb) != "undefined") { cb(); }
	}

	if (this.id == 0) {
		this.name = 		name;
		this.player_id = 	player_id;
		this.season = 		season;
		this.sport = 		sport;
	} else {
		this.populate();
	}
}

var Teams = new function () {
	this.find = find;
	function find(id, callback) {
		Q = "SELECT * FROM Team WHERE id IN [" + id + "];"
		log(Q);
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				//callback(results);
				log(results.rows.length);
				for (var i=0; i < results.rows.length; i++) {
					res.push(results.rows.item(i));
				}
			});	
		}, errorHandler);
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

t = new Team(5, "Cubs", 1, "2012", "baseball");
