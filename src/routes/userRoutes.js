const express = require("express");
const userRoutes = express();
const {
	checkInfoNewUser,
	checkUser,
} = require("../middleware/transactiosnMidd");

const {
	newUser,
	loginUser,
	detailUser,
	updateUser,
} = require("../controllers/users/userOperator");

//cadastrar + middleware validação
userRoutes.post("/usuario", checkInfoNewUser, newUser);
//fazer login
userRoutes.post("/login", loginUser);

// valida usuario logado em todas as rotas abaixo
userRoutes.use(checkUser);

//detalhar usuario
userRoutes.get("/usuario", detailUser);
//atualizar usuario
userRoutes.put("/usuario", updateUser);

module.exports = userRoutes;
