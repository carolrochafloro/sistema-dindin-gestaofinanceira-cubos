const express = require("express");
const categoryRoutes = express();

const {
	listCategories,
	newCategory,
} = require("../controllers/categories/index");

const checkAuth = require("../middleware/checkAuth");

categoryRoutes.use(checkAuth);

categoryRoutes.get("/categoria", listCategories);
categoryRoutes.post("/categoria/new", newCategory);

module.exports = categoryRoutes;
