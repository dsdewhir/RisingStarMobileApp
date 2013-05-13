// Global Variables 
var db; 
var shortName = 'rising-star'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 65535; 
var reset = true;

function errorHandler(transaction, error) { 
   console.log('Error: ' + error.message + ' code: ' + error.code); 
} 

function successCallBack() { 
   log("DEBUG: Transaction success"); 
} 

function testDatabase() {
	if (!window.openDatabase) {
		console.log("Databases are not supported in this browser!");
		return false;
	}
	return true;
}

function query(Q) {
	db.transaction(function(tx) {
		tx.executeSql(Q, [], nullHandler, errorHandler);	
	}, errorHandler, successCallBack);
}

function nullHandler(){}; 

function onBodyLoad(){ 
	if (!testDatabase()) { return; }

	db = openDatabase(shortName, version, displayName,maxSize); //openOrCreate
	log(db);
	if (reset==true) {
		Q = "DROP TABLE IF EXISTS User";
		query(Q);
		log("Dropped table User");
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
