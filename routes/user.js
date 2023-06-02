const express = require("express");
const routes = express.Router();
const userController = require("../controllers/user");
const userMiddlewares = require("../middlewares/user");

routes.post("/signup", userMiddlewares.isValide, userController.signUp);
routes.post("/login", userController.logIn);
routes.post("/add-new-book", userMiddlewares.isAuth, userController.addNewBook);
module.exports = routes;