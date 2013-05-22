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

function resetBaseballStats() {
	$("#show-baseball #stat-container span").text(0);	
}

function loadBaseballTeamStats(team_id) {
	Q = "SELECT * FROM Game WHERE team_id = " + team_id; //Get all the games, so we can look them up by id
	act_on_results(Q, function(row) {
		log(row.opponent);
		loadBaseballStats(row.id);
	});
}

function loadBaseballStats(game_id) { //fill values in the stats show
	resetBaseballStats();
	//$("#show-baseball #stat-container #stat_display_atbats span")	
	Q = "SELECT * FROM Score WHERE game_id = " + game_id;
	at_bats = 0;
	hits = 0;
	act_on_results(Q, function(row) {
		hit_fields = ["single", "double", "triple", "homerun"];
		if ($.inArray(row.field, hit_fields) > -1) { //add base-hits to at_bats, hits
			at_bats += row.amt;
			hits += row.amt;
		}
		if (row.field == "strikeout") { //at strikeouts to at_bats
			at_bats += row.amt;
		}
		html_row = $("#show-baseball #stat-container #stat_display_" + row.field + " span");
		html_row.text(parseInt(html_row.text()) + row.amt);
		update_global_stats(at_bats, hits);
	});
	function update_global_stats(at_bats_l, hits_l) {
		html_row = $("#show-baseball #stat-container #stat_display_atbats span");
		html_row.text(at_bats_l);
		html_row = $("#show-baseball #stat-container #stat_display_hits span");
		html_row.text(hits_l);
	}
}

/* EVENTS */
stats = ["single", "double", "triple", "homerun", "walk", "strikeout", "basesteal"];
for (var i = 0; i < stats.length; i++ ) {
	(function(i) {
		$("#baseballgame #statlist #stat_" + stats[i] + " .plus").click(function() {
			addOne(currentGame, stats[i], currentInning);
			window.setTimeout(function() { showScores(currentGame, "baseball", currentInning) }, 80);	
		});
	})(i);
	(function(i) {
		$("#baseballgame #statlist #stat_" + stats[i] + " .minus").click(function() {
			minusOne(currentGame, stats[i], currentInning);
			window.setTimeout(function() { showScores(currentGame, "baseball", currentInning) }, 80);	
		});
	})(i);
}