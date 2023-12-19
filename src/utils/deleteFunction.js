const knex = require("../config/dbConnection");

const delItem = async (table, column, value) => {
	const result = await knex(table).where(column, value).del();
	return result;
};

module.exports = delItem;
