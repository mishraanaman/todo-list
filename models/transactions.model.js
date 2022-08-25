const fs = require("fs");
const path = require("path");
const {parse} = require("csv-parse");

const transactions = [];

function loadTransactionsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "transactions.csv")
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on("data", (data) => {
        transactions.push(data);
      })
      .on("error", (err) => {
        console.log(err);
      })
      .on("end", () => {
        console.log(`${transactions.length} transactions found!`);
        console.log(transactions[0]);
        resolve();
      });
  });
}

//Given no parameters, return the latest portfolio value per token in USD
function getLatestPortfolioPerToken(){}

//Given a token, return the latest portfolio value for that token in USD
function getLatestPortfolioForToken(token){}

//Given a date, return the portfolio value per token in USD on that date
function getPortfolioPerTokenOnDate(date){}

//Given a date and a token, return the portfolio value of that token in USD on that date
function getPortfolioForTokenOnDate(token, date){}


module.exports = {
  loadTransactionsData, getLatestPortfolioPerToken,getLatestPortfolioForToken,getPortfolioPerTokenOnDate,getPortfolioForTokenOnDate 
};
