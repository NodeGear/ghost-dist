var path = require('path');
var mail = {};
var domain_protocol = 'http://';

if (process.env.MAIL_TRANSPORT != null) {
	mail.transport = process.env.MAIL_TRANSPORT;
	
	if (mail.transport == 'SES') {
		mail.options = {
			AWSAccessKeyID: process.env.MAIL_AWS_KEY,
			AWSSecretKey: process.env.MAIL_AWS_SECRET
		}
	}
	if (mail.transport == 'SMTP') {
		if (process.env.MAIL_HOST != null) mail.host = process.env.MAIL_HOST;
		mail.options = {
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS
			}
		}
	}
	
	if (process.env.MAIL_FROM != null) mail.fromaddress = process.env.MAIL_FROM;
	if (process.env.MAIL_PORT != null) mail.options.port = process.env.MAIL_PORT;
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

if (process.env.USE_HTTPS) {
	domain_protocol = 'https://';
}

module.exports = {
	production: {
		url: domain_protocol+process.env.DOMAIN,
		mail: mail,
		database: database,
		server: {
			host: '0.0.0.0',
			port: process.env.PORT
		}
	}
};
