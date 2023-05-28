const express = require("express");
const routes = express.Router();
const adminController = require("../controllers/admin");
const adminMiddlewares = require("../middlewares/admin");
routes.post("/login", adminController.logIn);
routes.post("/add-main-categ", adminMiddlewares.isAdmin, adminController.addMainCateg);
routes.post("/add-sub-categ", adminMiddlewares.isAdmin, adminController.addSubCateg);
module.exports = routes;