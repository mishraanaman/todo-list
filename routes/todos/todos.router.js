const express = require("express");

const {
  httpFetchTodoByID,
  httpFetchAllTodo
} = require("./todos.controller");

const {checkToken} = require(".././login/login.controller")

const todosRouter = express.Router();

todosRouter.get("/", checkToken, httpFetchAllTodo);
todosRouter.get("/:id",checkToken ,httpFetchTodoByID);
// todosRouter.post("/date/:date", httpGetPortfolioPerTokenOnDate);
// todosRouter.put("/:token/date/:date", httpGetPortfolioForTokenOnDate);

module.exports = todosRouter;
