function Team (id, name, player_id, season, sport) {
	this.id = 			id;
	this.list =			$("#teamlist");
	this.games =		[];

	this.populateGames = populateGames;
	function populateGames() {
		Q = "SELECT * FROM Game WHERE id = " + this.id;
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				for (var i = 0; i < results.rows.length; i++) {
					//NEED TO CONVERT THIS TO GAME OBJECT
					var gg = new Game(results.rows.item(i).id);
					that.games.push(gg);
				}
			});	
		}, errorHandler);

	}

	this.populate = populate;
	function populate() {
		var Q = "SELECT * FROM Team WHERE id = " + this.id;
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				var it = results.rows.item(0);
				log("populate result");
				log(it);
				that.name = it['name'];
				that.season = it['season'];
				that.player_id = it['player_id'];
				that.sport = it['sport'];
				that.populateGames();
			});	
		}, errorHandler);
		this.populateGames();
	}

	this.save = save;
	function save(cb) {
		var Q = "UPDATE Team SET name='" + this.name + "', player_id='" + this.player_id + "', season='" + this.season + "', sport='" + this.sport + "' WHERE id=" + this.id;	
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
			var that = this;
			setTimeout(function() { that.set_id(element); }, 100);
			return;
		}
		log(element + ": " + this.id);
	}
	
	this.create = create;
	function create(cb) {
		var that = this;
		var Q = "INSERT INTO Team (name, player_id, season, sport) VALUES ('" + this.name + "', '" + this.player_id + "', '" + this.season + "', '" + this.sport + "')";
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
		this.name = 		name;
		this.player_id = 	player_id;
		this.season = 		season;
		this.sport = 		sport;
		this.create(this.populate);
	}
	this.initialize();

}

function Teams () {
	this.teams = [];
	
	this.find = find;
	function find(ids, callback) {
		this.teams = [];
		var Q = "SELECT * FROM Team WHERE id IN (" + String(ids) + ");"
		log(Q);
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				//callback(results);
				log(results.rows.length);
				for (var i=0; i < results.rows.length; i++) {
					that.teams.push(results.rows.item(i));
				}
			});	
		}, errorHandler);
	}
}

function teamInitialize() {
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
		new Team(0, "Cubs", 1, "2012", "baseball");
		new Team(0, "Celtics", 1, "2013", "basketball");
	}
}
teamInitialize();
