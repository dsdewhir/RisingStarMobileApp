/* in the file we make baseball queries */

function addOne(rowid) {
	Q = "UPDATE Score SET amt=amt+1 WHERE id = '" + rowid + "'";
	query(Q);
}

function getRow(game_id, stat) { //returns a row_id for stat for currentGame
	
}

/* EVENTS */
$(".baseball-single").click(function() {
	addOne(getRow(currentGame, "single"));
	loadScores(currentGame); //or just add one to the counter field
});
