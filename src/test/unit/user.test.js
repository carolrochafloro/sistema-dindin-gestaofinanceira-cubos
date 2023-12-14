const app = require("../../server");
const request = require("supertest");

const {
	deleteUser,
	detailUser,
	login,
	newUser,
	updateUser,
} = require("../../controllers/users/index");

test("deve acessar a rota principal", async () => {
	const response = await request(app).get("/");
	expect(response.status).toBe(200);
});
