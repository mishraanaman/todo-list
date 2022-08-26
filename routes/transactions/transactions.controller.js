const {
  getLatestPortfolioPerToken,
  getLatestPortfolioForToken,
  getPortfolioPerTokenOnDate,
  getPortfolioForTokenOnDate,
} = require("../../models/transactions.model.js");

async function httpGetLatestPortfolioPerToken(req, res) {
  const success = await getLatestPortfolioPerToken();
  //console.log("success", success);
  if (!success) {
    return res.status(400).json({
      error: "Please contact IT Support",
    });
  }

  return res.status(200).json(success);
}

async function httpGetLatestPortfolioForToken(req, res) {
  const token = req.params.token;

  const success = await getLatestPortfolioForToken(token);
  if (!success) {
    return res.status(400).json({
      error: "Please contact IT Support",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

async function httpGetPortfolioPerTokenOnDate(req, res) {
  const date = req.params.date;

  const success = await getPortfolioPerTokenOnDate(date);
  if (!success) {
    return res.status(400).json({
      error: "Please contact IT Support",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

async function httpGetPortfolioForTokenOnDate(req, res) {
  const token = req.params.token;
  const date = req.params.date;

  const success = await getPortfolioForTokenOnDate(token, date);
  if (!success) {
    return res.status(400).json({
      error: "Please contact IT Support",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetLatestPortfolioPerToken,
  httpGetLatestPortfolioForToken,
  httpGetPortfolioPerTokenOnDate,
  httpGetPortfolioForTokenOnDate,
};
