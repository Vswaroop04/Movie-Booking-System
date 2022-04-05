const mysql = require('mysql');
// const {execSync} = require('child_process');

// const readline = require('readline').createInterface({
// 	input : process.stdin,
// 	output : process.stdout
// });

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	port: 3306,
	password : '',
	database : 'movie_booking'
});

connection.connect((err) => {
	if (err) {
		console.log('[ERROR] ==> Connection' + err.stack);
	}else{
		console.log('[VOILA] ==> Connected');
	}	
})

function queryTable(tableName, attribute){
	connection.query('SELECT ' + attribute + ' FROM ' + tableName, (err, res) => {
		if (err) {
			console.log('[ERROR] ==> ' + err.stack);
		}else{
			console.log(res);
		}
	});
}


///readline.question('[TABLE] ==> Table Name: ', tableName => {
///	console.log('Fetching data for table ' + tableName);
///});


queryTable('admin', 'userId');
queryTable('users', 'userId');
queryTable('seats', 'movie_name');
queryTable('tickets', 'ticket_id');
