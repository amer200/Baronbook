const express = require("express");
const routes = express.Router();
const mainController = require("../controllers/main");
routes.get("/all-main-categs", mainController.getAllMainCategs);
routes.get("/all-sub-categs", mainController.getAllSubCategs);
routes.get("/get-subs-by-main/:mainId", mainController.getSubsByMain);
module.exports = routes;