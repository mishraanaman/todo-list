const express = require("express");

const {
  httpGetLatestPortfolioPerToken,
  httpGetLatestPortfolioForToken,
  httpGetPortfolioPerTokenOnDate,
  httpGetPortfolioForTokenOnDate,
} = require("./transactions.controller");

const transactionsRouter = express.Router();

transactionsRouter.get("/", httpGetLatestPortfolioPerToken);
transactionsRouter.get("/:token", httpGetLatestPortfolioForToken);
transactionsRouter.get("/:date", httpGetPortfolioPerTokenOnDate);
transactionsRouter.get("/:token/:date", httpGetPortfolioForTokenOnDate);

module.exports = transactionsRouter;
