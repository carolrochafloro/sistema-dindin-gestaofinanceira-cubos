const knex = require("knex")({
	client: "pg",
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_LOGIN,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE,
	},
	pool: {
		min: 0,
		max: 10,
	},
});
module.exports = knex;
