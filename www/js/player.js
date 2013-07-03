function Player (id, name) {
	this.id = 			id;
	this.list =			$("#playerlist");
	this.teams =		[];

	this.populateTeams = populateTeams;
	function populateTeams() {
		var Q = "SELECT * FROM Team WHERE player_id = " + this.id;
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				for (var i = 0; i < results.rows.length; i++) {
					var t = new Team(results.rows.item(i).id);
					that.teams.push(t);
				}
			});	
		}, errorHandler);

	}

	this.populate = populate;
	function populate() {
		var Q = "SELECT * FROM Player WHERE id = " + this.id;
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				var it = results.rows.item(0);
				that.name = it['name'];
				that.populateTeams();
			});	
		}, errorHandler);
	}

	this.save = save;
	function save(cb) {
		var Q = "UPDATE Player SET name='" + this.name + "' WHERE id=" + this.id;	
		query(Q);
		cb();
	}

	this.listInsert = listInsert;
	function listInsert() {
		this.list.append('<li class="forward"><a href="#player">' + this.name + '<input type="hidden" value="' + this.id + '" /></a></li');
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
		var playerdata = [this.name];
		var Q = "INSERT INTO Player (name) VALUES (?)";
		log(Q);
		db.transaction(function(tx) {
			tx.executeSql(Q, playerdata, function(tx, results) {
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
		this.teams = 		[];
		this.create(this.populate);
	} else {
		this.initialize();
	}

}

function Players () {
	this.players = [];
	
	this.find = find;
	function find(ids, callback) {
		log("callback");
		log(ids);
		log(callback);
		this.players = [];
		var Q = "SELECT * FROM Player";
		var that = this;
		db.transaction(function(tx) {
			tx.executeSql(Q, [], function(tx, results) {
				for (var i=0; i < results.rows.length; i++) {
					var pp = new Player(results.rows.item(i).id);
					that.players.push(pp);
				}
				if (typeof(callback) != "undefined") { callback(); }
			});	
		}, errorHandler);
	}
}

function playerInitialize() {
	function createPlayerTable() {
		var Q = "CREATE TABLE IF NOT EXISTS Player(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL)";
		query(Q);
	}
	
	if (reset==true) {
		query("DROP TABLE IF EXISTS Player");
	}
	
	createPlayerTable();
	
	if (reset == true) {
		jesse = new Player(0, "Jesse Briggs");
		dan = new Player(0, "Dan Briggs");
	}
}

playerInitialize();

playersearch = new Players();
playersearch.find([], function() { setTimeout('load_items(playersearch.players)', 500); });
