const express = require("express");
const routes = express.Router();
const mainController = require("../controllers/main");
routes.get("/all-main-categs", mainController.getAllMainCategs);
routes.get("/all-sub-categs", mainController.getAllSubCategs);

module.exports = routes;