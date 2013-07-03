function Game (id, team_id, opponent, sport, date, at_home) {
	this.id = 			id;
	this.list =			$("#gamelist");

	this.populateScores = populateScores;
	function populateScores() {
		var Q = "SELECT * FROM Score WHERE team_id = " + this.id;
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				for (var i = 0; i < results.rows.length; i++) {
					var t = new Score(results.rows.item(i).id);
					that.scores.push(t);
				}
			});	
		}, errorHandler);

	}

	this.populate = populate;
	function populate() {
		var Q = "SELECT * FROM Game WHERE id = " + this.id;
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				var it = results.rows.item(0);
				that.team_id = it['team_id'];
				that.opponent = it['opponent'];
				that.sport = it['sport'];
				that.date = it['date'];
				that.at_home = it['at_home'];
				//that.populateScores();
			});	
		}, errorHandler);
	}

	this.save = save;
	function save(cb) {
		var Q = "UPDATE Game SET team_id='" + this.team_id + "', opponent='" + this.opponent + "', sport='" + this.sport + "', at_home='" + this.at_home + "' WHERE id=" + this.id;	
		query(Q);
		cb();
	}

	this.listInsert = listInsert;
	function listInsert() {
		this.list.append('<li class="forward"><a href="#' + this.sport + 'game">' + this.opponent + '<input type="hidden" value="' + this.id + '" /></a></li');
	}
	
	this.set_id = set_id;
	function set_id(element) {
		//We can't get an ID, but we can set one on the form
		if (this.id == 0 || this.id == "undefined") {
			var that = this;
			setTimeout(function() { that.set_id(element); }, 100);
			return;
		}
		log(element + ": " + this.id);
	}
	
	this.create = create;
	function create(cb) {
		var that = this;
		var Q = "INSERT INTO Game (team_id, opponent, sport, date, at_home) VALUES ('" + this.team_id + "', '" + this.opponent + "', '" + this.sport + "', '" + this.date + "', '" + this.at_home + "')";
		log(Q);

		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				that.id = results.insertId;
			});	
		}, errorHandler);

		if (typeof(cb) != "undefined") { cb(); }
	}
	
	this.initialize = initialize;
	function initialize() {
		this.populate();
	}

	if (this.id == 0) {
		this.team_id = 		team_id;
		this.opponent = 	opponent;
		this.sport = 		sport;
		this.date = 		date;
		this.at_home =		at_home;
		this.create();
	} else {
		this.initialize();
	}

}

function Games () {
	this.games = [];
	
	this.find = find;
	function find(ids, callback) {
		this.games = [];
		var Q = "SELECT * FROM Games WHERE id IN (" + String(ids) + ");"
		log(Q);
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				log(results.rows.length);
				for (var i=0; i < results.rows.length; i++) {
					var gg = new Game(results.rows.item(i).id);
					that.games.push(gg);
				}
			});	
		}, errorHandler);
	}
}



/*
function loadGames(team_id) {
	log("function loadGames");
	function list_game(row) {
		log("function list_game");
		$("#gamelist .empty").remove();
		opponent = (row.at_home == 0) ? "@ " : "vs ";
		opponent += row.opponent;
		$('#gamelist').append('<li class="forward"><a href="#' + row.sport + 'game">' + opponent + ' <span class="gamedate">' + row.date + '</span><input type="hidden" value="' + row.id + '"</a></li>'); 
	}
	function log_no_results() {
		log("Load Games: no results");
	}
	$("#gamelist").html("<li class='empty'>No games found.</li>");
	Q = "SELECT * FROM Game WHERE team_id = " + team_id;
	log(Q);
	act_on_results(Q, list_game, log_no_results);
}
*/

function scoreShow(team_id) {
	//loadify all teh scores!
	log("Loading scores");
}

function newGame(team_id, opponent, sport, date, at_home) {
	log("function newGame");
	Q = "INSERT INTO Game (team_id, opponent, sport, date, at_home) VALUES ('" + team_id + "', '" + opponent + "', '" + sport + "', '" + date + "', " + at_home + ")";
	query(Q, function() { loadGames(team_id); });
}

function createGameTable() {
	Q = "CREATE TABLE IF NOT EXISTS Game(id INTEGER NOT NULL PRIMARY KEY, team_id TEXT NOT NULL, opponent TEXT NOT NULL, sport TEXT NOT NULL, date TEXT NOT NULL, at_home BOOLEAN NOT NULL)";
	query(Q);
}

function game_initialize() {
	if (reset == true) {
		query("DROP TABLE IF EXISTS Game");
	}
	
	createGameTable();

	if (reset == true) {
		newGame(0, 1, "Bobcats", "baseball", "Mar 5, 2012", 0);
	}
}
game_initialize();