const express = require("express");

const {
  httpFetchTodoByID,
  httpFetchAllTodo,
  httpCreateTodo,
  httpRemoveTodoByID,
} = require("./todos.controller");

const { checkToken } = require(".././login/login.controller");

const todosRouter = express.Router();

todosRouter.get("/", checkToken, httpFetchAllTodo);
todosRouter.get("/:id", checkToken, httpFetchTodoByID);
todosRouter.post("/", checkToken, httpCreateTodo);
todosRouter.delete("/:id", checkToken, httpRemoveTodoByID)

module.exports = todosRouter;
