function loadPlayers() {
 $("#playerlist").html("");
 db.transaction(function(transaction) { 
   transaction.executeSql('SELECT * FROM Player;', [], 
     function(transaction, result) { 
      if (result != null && result.rows != null) { 
        for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
          $('#playerlist').append('<li class="forward"><a href="#player">' + row.name + '</a></li>'); 
        } 
      }
     },errorHandler); 
 },errorHandler,nullHandler); 
 log("Players loaded");
}

function newPlayer(player_name) {
	Q = "INSERT INTO Player (name) VALUES ('" + player_name + "')";
	query(Q);
	log("Saved new player: " + player_name);
}

function createPlayerTable() {
	Q = "CREATE TABLE IF NOT EXISTS Player(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL)";
	query(Q);
}

if (reset==true) {
	query("DROP TABLE IF EXISTS Player");
	log("Table Player dropped.");
}

createPlayerTable();
if (reset==true) {
	newPlayer("Jesse Briggs");
	newPlayer("Dan Briggs");
}
loadPlayers();
