const express = require("express");
const categoryRoutes = express();

const {
	listCategories,
	newCategory,
	deleteCategory,
} = require("../controllers/categories/index");

const checkAuth = require("../middleware/checkAuth");

categoryRoutes.use(checkAuth);

categoryRoutes.get("/categoria", listCategories);
categoryRoutes.post("/categoria/new", newCategory);
categoryRoutes.delete("/categoria/:id", deleteCategory);

module.exports = categoryRoutes;
