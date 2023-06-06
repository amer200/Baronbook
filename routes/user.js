const express = require("express");
const routes = express.Router();
const userController = require("../controllers/user");
const userMiddlewares = require("../middlewares/user");

routes.post("/signup", userMiddlewares.isValide, userController.signUp);
routes.post("/login", userController.logIn);
routes.post("/edit-user-data", userMiddlewares.isValide, userMiddlewares.isAuth, userController.editUserData);
routes.post("/add-new-book", userMiddlewares.isAuth, userController.addNewBook);
routes.get("/get-user-books", userMiddlewares.isAuth, userController.getBooksByUser);
module.exports = routes;