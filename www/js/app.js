var debug = true;
var currentPlayer = 1;
var currentTeam = 1;
var currentGame = 1;
var currentInning = 1;

function log(log_text) {
	if (debug == true) {
		console.log(log_text);
	}
}

function empty_list(x) {
	if (x.find("li").length == 0) {
		x.append("<li>Didn't find any</li>");
	}
}