function Game (id, team_id, opponent, sport, date, at_home) {
	this.id = 			id;
	this.list =			$("#gamelist");

	this.populate = populate;
	function populate() {
		if (this.id != 0) {
			var Q = "SELECT * FROM Game WHERE id = " + this.id;
			log(Q);
			var that = this;
			db.transaction(function(tx) {
				tx.executeSql(Q, [], function(tx, results) {
					var it = results.rows.item(0);
					that.team_id = it['team_id'];
					that.opponent = it['opponent'];
					that.sport = it['sport'];
					that.date = it['date'];
					that.at_home = it['at_home'];
				});	
			}, errorHandler);
		} else {
			log("Called populate() on Game object when id was 0");
		}
	}

	this.save = save;
	function save(cb) {
		var Q = "UPDATE Game SET team_id='" + this.team_id + "', opponent='" + this.opponent + "', sport='" + this.sport + "', at_home='" + this.at_home + "' WHERE id=" + this.id;	
		query(Q);
		cb();
	}

	this.getOpponentListing = getOpponentListing;
	function getOpponentListing() {
		if(this.at_home) {
			return "vs " + this.opponent;
		} else {
			return "@ " + this.opponent;
		}
	}

	this.listInsert = listInsert;
	function listInsert() {
		this.list.find(".listblank").hide();
		this.list.append('<li class="forward playerAvatar"><img src="./img/avatar-baseball.png"><a href="#' + this.sport + 'game">' + this.getOpponentListing() + "  <span class='li_gamedate'>" + this.date + '</span><input type="hidden" value="' + this.id + '" /></a></li');
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
		var gamedata = [this.team_id, this.opponent, this.sport, this.date, this.at_home];
		var Q = "INSERT INTO Game (team_id, opponent, sport, date, at_home) VALUES (?, ?, ?, ?, ?)";
		log(Q + ", " + String(gamedata));

		db.transaction(function(tx) {
			tx.executeSql(Q, gamedata, function(tx, results) {
				that.id = results.insertId;				log(that.id);
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
		var that = this;
		this.create(function() { that.populate(); });
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
	query(Q, function() {});
}

function createGameTable() {
	Q = "CREATE TABLE IF NOT EXISTS Game(id INTEGER NOT NULL PRIMARY KEY, team_id INTEGER NOT NULL, opponent TEXT NOT NULL, sport TEXT NOT NULL, date TEXT NOT NULL, at_home BOOLEAN NOT NULL)";
	query(Q);
}

function game_initialize() {
	if (reset == true) {
		query("DROP TABLE IF EXISTS Game");
	}
	
	createGameTable();

	if (reset == true) {
		new Game(0, 1, "Braves", "baseball", "Mar 5, 2012", 1);
		new Game(0, 1, "Royals", "baseball", "Mar 6, 2012", 1);
		new Game(0, 3, "Cardinals", "baseball", "Mar 5, 2012", 0);
		new Game(0, 2, "Orlando Magic", "basketball", "Mar 5, 2012", 1);
		new Game(0, 4, "Utah Jazz", "basketball", "Mar 5, 2012", 0);
	}
}
game_initialize();