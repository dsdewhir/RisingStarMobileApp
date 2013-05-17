
function addOne(rowid, stat) {
	if (rowid != -1) {
		Q = "UPDATE Score SET amt=amt+1 WHERE id = '" + rowid + "'";
		query(Q);
	} else {
		Q = "INSERT INTO Score (game_id, stat, inning) VALUES (" + currentGame + ", '" + stat + "', " + currentInning + ")";
		query(Q);
	}
}

function getRow(game_id, stat) { //returns a row_id for stat for currentGame
	Q = "SELECT id FROM Score WHERE game_id = " + game_id + " AND stat = '" + stat + "'";
	selectID(Q, function(x) {
		currentRow = x[0]['id'];
	});
}