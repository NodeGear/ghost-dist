var path = require('path');
var mail = {};

if (process.env.MAIL_TRANSPORT != null) {
	mail.transport = process.env.MAIL_TRANSPORT;
		mail.options = {
		service: process.env.MAIL_SERVICE,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
			}
		}
}
var database = {
	client: 'sqlite3',
	connection: {
		filename: path.join(__dirname, '/content/data/ghost.db')
	},
	debug: false
}

if (process.env.DATABASE) {
	database.client = 'mysql';
	database.connection = {
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		charset: 'utf8'
	};
	database.pool = {
		min: 0,
		max: 5
	};
}

module.exports = {
	production: {
		url: 'http://'+process.env.DOMAIN,
		mail: mail,
		database: database,
		server: {
			host: '0.0.0.0',
			port: process.env.PORT
		}
	}
};
