/* in the file we make baseball queries */
var currentRow;

function loadBaseballScores(game_id) {
	log("loadBaseballScores:" + game_id);
	Q = "SELECT * FROM Score WHERE game_id = " + game_id;
	act_on_results(Q, function(row) {
		//gets one row
		$("#baseballgame #amt_" + row.field).text(row.amt);
		log("loaded a baseball score row");
	});
}

/* EVENTS */
$("#baseball-single-add").click(function() {
	addOne(getRow(currentGame, "single"), "single");
	showScores(currentGame, "baseball"); //or just add one to the counter field
});
$("#statlist #stat_single .plus").click(function() {
	addOne(currentGame, "single");
	window.setTimeout(function() { showScores(currentGame, "baseball") }, 50);
	//loadBaseballScores(currentGame); //or just add one to the counter field
});