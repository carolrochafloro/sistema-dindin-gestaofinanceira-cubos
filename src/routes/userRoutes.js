const express = require("express");
const userRoutes = express();

const {
	newUser,
	loginUser,
	detailUser,
	updateUser,
} = require("../controllers/users/userOperator");

const checkUser = require("../middleware/transactiosnMidd");

//cadastrar
rotas.post("/usuario", newUser);
//fazer login
rotas.post("/login", loginUser);

// valida usuario logado
rotas.use(verUsuarioLogado);

//detalhar usuario
rotas.get("/usuario", detailUser);
//atualizar usuario
rotas.put("/usuario", updateUser);

module.exports = userRoutes;
