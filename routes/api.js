const express = require('express');

const todosRouter = require('./todos/todos.router');

const loginRouter = require('./login/login.router')

const api = express.Router();

api.use("/login",loginRouter)
api.use("/todos", todosRouter);

module.exports = api;