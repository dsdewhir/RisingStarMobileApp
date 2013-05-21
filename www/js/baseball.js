/* in the file we make baseball queries */
var currentRow;

function loadBaseballScores(game_id, inning) {
	$("#statlist li small").text(0)
	Q = "SELECT * FROM Score WHERE game_id = " + game_id + " AND inning = " + inning;
	log(Q);
	act_on_results(Q, function(row) {
		$("#baseballgame #amt_" + row.field).text(row.amt);
	}, function(){} );
}

/* EVENTS */
stats = ["single", "double", "triple", "homerun", "walk", "strikeout", "steal"];
for (var i = 0; i < stats.length; i++ ) {
	(function(i) {
		$("#statlist #stat_" + stats[i] + " .plus").click(function() {
			addOne(currentGame, stats[i], currentInning);
			window.setTimeout(function() { showScores(currentGame, "baseball", currentInning) }, 80);	
		});
	})(i);
	(function(i) {
		$("#statlist #stat_" + stats[i] + " .minus").click(function() {
			minusOne(currentGame, stats[i], currentInning);
			window.setTimeout(function() { showScores(currentGame, "baseball", currentInning) }, 80);	
		});
	})(i);
}