const express = require("express");

const { checkToken, HandlerGenerator } = require("./login.controller");

const loginRouter = express.Router();

let handlers = new HandlerGenerator();

loginRouter.post("/", handlers.login);

module.exports = loginRouter;
