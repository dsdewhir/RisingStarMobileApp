/* in the file we make baseball queries */
var currentRow;

function loadBasketballScores(game_id, inning) {
	$("#statlist li small").text(0)
	Q = "SELECT * FROM Score WHERE game_id = " + game_id + " AND inning = " + inning;
	log(Q);
	act_on_results(Q, function(row) {
		$("#basketballgame #amt_" + row.field).text(row.amt);
	}, function(){} );
}

/* EVENTS */
bbstats = ["fieldgoal", "threepointer", "freethrow", "rebound", "steal", "block", "turnover"];
for (var i = 0; i < bbstats.length; i++ ) {
	console.log(bbstats[i]);
	(function(i) {
		$("#basketballgame #statlist #stat_" + bbstats[i] + " .plus").click(function() {
			addOne(currentGame, bbstats[i], currentInning);
			window.setTimeout(function() { showScores(currentGame, "basketball", currentInning) }, 80);	
		});
	})(i);
	(function(i) {
		$("#basketballgame #statlist #stat_" + bbstats[i] + " .minus").click(function() {
			minusOne(currentGame, bbstats[i], currentInning);
			window.setTimeout(function() { showScores(currentGame, "basketball", currentInning) }, 80);	
		});
	})(i);
}