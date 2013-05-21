/* in the file we make baseball queries */
var currentRow;

function loadBaseballScores(game_id) {
	//log("load baseball scores for game: " + game_id);
	Q = "SELECT * FROM Score WHERE game_id = " + game_id;
	act_on_results(Q, function(row) {
		$("#baseballgame #amt_" + row.field).text(row.amt);
	});
}

/* EVENTS */
stats = ["single", "double", "triple", "homerun", "walk", "strikeout", "steal"];
for (var i = 0; i < stats.length; i++ ) {
	(function(i) {
		$("#statlist #stat_" + stats[i] + " .plus").click(function() {
			addOne(currentGame, stats[i]);
			window.setTimeout(function() { showScores(currentGame, "baseball") }, 80);	
		});
	})(i);
	(function(i) {
		$("#statlist #stat_" + stats[i] + " .minus").click(function() {
			minusOne(currentGame, stats[i]);
			window.setTimeout(function() { showScores(currentGame, "baseball") }, 80);	
		});
	})(i);
}