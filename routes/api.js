const express = require('express');

const transactionsRouter = require('./transactions/transactions.router');

const api = express.Router();

api.use("/transactions", transactionsRouter);

module.exports = api;