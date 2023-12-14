const knex = require("knex")({
	client: "pg",
	connection: {
		host: process.env.HOST,
		port: process.env.PORT2,
		user: process.env.USERBD,
		password: process.env.SENHABD,
		database: process.env.DATABASE,
	},
	pool: {
		min: 0,
		max: 10,
	},
});
module.exports = knex;
