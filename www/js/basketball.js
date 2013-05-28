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

function resetBasketballStats() {
	$("#show-basketball #stat-container span").text(0);	
}

function loadBasketballTeamStats(team_id) {
	Q = "SELECT * FROM Game WHERE team_id = " + team_id; //Get all the games, so we can look them up by id
	act_on_results(Q, function(row) {
		log(row.opponent);
		loadBasketballStats(row.id);
	});
}

function loadBasketballStats(game_id) { //fill values in the stats show
	resetBasketballStats();
	//$("#show-baseball #stat-container #stat_display_atbats span")	
	Q = "SELECT * FROM Score WHERE game_id = " + game_id;
	act_on_results(Q, function(row) {
		html_row = $("#show-basketball #stat-container #stat_display_" + row.field + " span");
		html_row.text(parseInt(html_row.text()) + row.amt);
		field_goals = parseInt($("#stat_display_fieldgoal span").text());
		threes = parseInt($("#stat_display_threepointer span").text());
		free_throws = parseInt($("#stat_display_freethrow span").text());
		total_points = (field_goals * 2) + (threes * 3) + free_throws;
		$("#stat_display_totalpoints span").text(total_points);
	});
}

/* EVENTS */
bbstats = ["fieldgoal", "threepointer", "freethrow", "rebound", "steal", "block", "turnover"];
for (var i = 0; i < bbstats.length; i++ ) {
	console.log(bbstats[i]);
	(function(i) {
		$("#basketballgame #statlist #stat_" + bbstats[i] + " .plus").click(function() {
			addOne(currentGame, bbstats[i], currentInning);
			//window.setTimeout(function() { showScores(currentGame, "basketball", currentInning) }, 80);	
		});
	})(i);
	(function(i) {
		$("#basketballgame #statlist #stat_" + bbstats[i] + " .minus").click(function() {
			minusOne(currentGame, bbstats[i], currentInning);
			//window.setTimeout(function() { showScores(currentGame, "basketball", currentInning) }, 80);	
		});
	})(i);
}
