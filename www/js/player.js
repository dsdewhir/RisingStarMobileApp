function newPlayer(player_name) {
	Q = "INSERT INTO Player (name) VALUES ('" + player_name + "')";
	query(Q);
}

function createPlayerTable() {
	Q = "CREATE TABLE IF NOT EXISTS Player(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL)";
	query(Q);
}

if (reset==true) {
	query("DROP TABLE IF EXISTS Player");
	log("Table Player dropped.");
}

createPlayerTable();
newPlayer("Jesse Briggs");
