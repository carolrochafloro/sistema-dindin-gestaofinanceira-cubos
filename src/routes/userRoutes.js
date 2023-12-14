const express = require("express");
const userRoutes = express();

const {
	newUser,
	login,
	updateUser,
	detailUser,
	deleteUser,
} = require("../controllers/users/index");

const {
	checkAuth,
	checkEmailExists,
	checkInfoNewUser,
} = require("../middleware/index");

userRoutes.post("/usuario", checkInfoNewUser, checkEmailExists, newUser);

userRoutes.post("/login", login);

userRoutes.use(checkAuth);

userRoutes.get("/usuario", detailUser);

userRoutes.put("/usuario", updateUser);

userRoutes.delete("/usuario", deleteUser);

module.exports = userRoutes;
