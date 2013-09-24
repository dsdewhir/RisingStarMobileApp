var debug = true;
//var currentPlayer = 1;
//var currentTeam = 1;
//var currentGame = 1;
//var currentInning = 1;
//var currentSport = "baseball";

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

function load_items(item_arr) {
	//log("Loading items for " + String(item_arr))
	for (var i = 0; i < item_arr.length; i++) {
		item_arr[i].listInsert();
	}
}

function clear_items(selector, callback_function) {
	selector.html("<li class='listblank'>None found</li>");
	if (typeof(callback_function) != 'undefined') { callback_function(); }	
}

function execute_after_set(value, eval_code, callback) {
	if (eval(eval_code) != undefined) {
		callback();
	} else {
		setTimeout(function() { execute_after_set(value, eval_code, callback); }, 100);
	}
}
