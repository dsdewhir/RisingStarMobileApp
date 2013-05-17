/* in the file we make baseball queries */
var currentRow;

function loadBaseballScores(game_id) {
	
}

/* EVENTS */
$("#baseball-single-add").click(function() {
	addOne(getRow(currentGame, "single"), "single");
	loadBaseballScores(currentGame); //or just add one to the counter field
});