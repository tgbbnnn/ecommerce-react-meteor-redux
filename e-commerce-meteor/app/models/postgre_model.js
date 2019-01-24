// Postgre model its use for all request on our database

// conf

const pg = require('pg');

let PostgreDb = function () {
	this.config = {
		user: 'postgres',
		database: 'db_e_commerce', 
		password: '', 
		host: 'localhost', 
		port: 5432, 
		max:10, 		
	}
	
	this.pool = new pg.Pool(this.config)	
}



module.exports = new PostgreDb()