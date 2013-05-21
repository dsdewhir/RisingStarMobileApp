// Global Variables 
var db; 
var shortName = 'rising-star'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 65535; 
var reset = true;

if (reset == true) {
	log("Tables are being reset.");
}

function errorHandler(transaction, error) { 
   console.log('Error: ' + error.message + ' code: ' + error.code); 
} 

function act_on_results(Q, doThis) {
 db.transaction(function(transaction, doThis) { 
   transaction.executeSql(Q, [], 
     function(transaction, result, doThis) { 
      if (result != null && result.rows != null) { 
        for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
		  doThis(row);
        } 
      }
     },errorHandler); 
 },errorHandler,nullHandler); 
 log("act_on_results complete.");
}

function act_on_results(Q, doThis, emptyResultsFunction) {
	db.transaction(function(transaction) {
		transaction.executeSql(Q, [],
			function(transaction, result) {
				if (result != null && result.rows != null && result.rows.length > 0) {
					log(result.rows);
					eachRow(result.rows, doThis); //doThis is anonymous function from caller
					//return(result.rows);
				} else {
					emptyResultsFunction();
				}
			}
		);
	});
}

function test_for_none(Q, doThis) {
	db.transaction(function(transaction) {
		transaction.executeSql(Q, [],
			function(transaction, result) {
				log("TEST: rows: " + result.rows.length);
				if (result.rows.length < 1) {
					log("No results");
					//doThis();
				}
			}
		);
	});
}

function eachRow(rows, do_this) {
	for (var i=0; i < rows.length; i++) {
		var row = rows.item(i);
		do_this(row);
	}
}

function successCallBack() { 
   //log("DEBUG: Transaction success"); 
} 

function testDatabase() {
	if (!window.openDatabase) {
		console.log("Databases are not supported in this browser!");
		return false;
	}
	return true;
}

function selectID(Q, callBack) {
	var result = [];
	db.transaction(function(tx) {
		tx.executeSql(Q, [], function(tx, rs) {
			for (var i=0; i<rs.rows.length; i++) {
				var row = rs.rows.item(i);
				result[i] = {id: row['id']}
			}
			log(result);
			callBack(result);
		}, errorHandler);
	});
}

function query(Q) {
	log(Q);
	db.transaction(function(tx) {
		tx.executeSql(Q, [], nullHandler, errorHandler);	
	}, errorHandler, successCallBack);
}

function nullHandler(){}; 

function onBodyLoad(){ 
	if (!testDatabase()) { return; }

	db = openDatabase(shortName, version, displayName,maxSize); //openOrCreate
	//log(db);
	if (reset==true) {
		Q = "DROP TABLE IF EXISTS User";
		query(Q);
	}
	Q = 'CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL)';
	query(Q);
} 

function ListUsers() { 
 db.transaction(function(transaction) { 
   transaction.executeSql('SELECT * FROM User;', [], 
     function(transaction, result) { 
      if (result != null && result.rows != null) { 
        for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
          $('#lbUsers').append('<br>' + row.UserId + '. ' + 
row.FirstName+ ' ' + row.LastName); 
		  log("ROW: " + row.UserId + '. ' + row.FirstName + ' ' + row.LastName);
        } 
      } 
     },errorHandler); 
 },errorHandler,nullHandler); 


 return; 
} 

function AddUserToDB() { 
	db.transaction(function(transaction) { 
		transaction.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',["Jesse", "Briggs"], nullHandler,errorHandler); 
	}); 
	return false; 
}

onBodyLoad();
//AddUserToDB();
//ListUsers();
