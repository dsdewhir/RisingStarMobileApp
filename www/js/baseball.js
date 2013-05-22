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
		console.log(html_row);
		html_row.text(parseInt(html_row.text()) + row.amt);
	});
	window.setTimeout(function() {
		console.log(at_bats); 
		html_row = $("#show-baseball #stat-container #stat_display_atbats span");
		html_row.text(parseInt(html_row.text()) + at_bats);
		html_row = $("#show-baseball #stat-container #stat_display_hits span");
		html_row.text(parseInt(html_row.text()) + hits);
		}, 300);
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