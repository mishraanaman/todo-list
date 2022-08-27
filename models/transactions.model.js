const fs = require ("fs");
const path= require ("path");
const moment = require("moment");
const {parse} = require ("csv-parse");
const{convertMapToJson} = require("../utils/parser")
const {getPriceConversion} = require ("../../data/nomics");
const console = require("console");

const transactions = [];
let prices = [];
let BTC_IN_USD = prices[0];
let ETH_IN_USD = prices[1];
let XRP_IN_USD = prices[2];
(async () => {
  prices= await getPriceConversion();
  //console.log('prices', prices)
})().then(()=>{
  BTC_IN_USD = prices[0];
  ETH_IN_USD = prices[1];
  XRP_IN_USD = prices[2];
 })
//.then(()=>{console.log(BTC_IN_USD, ETH_IN_USD, XRP_IN_USD);
// });


function loadTransactionsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "transactions.csv")
    )
      .pipe(
        parse({
          comment: "#",
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
        //console.log(transactions[0]);
        resolve();
      });
  });
}

//Given no parameters, return the latest portfolio value per token in USD
function getLatestPortfolioPerToken() {
  const response = utilityFunction();
  return convertMapToJson(response);
}

//Given a token, return the latest portfolio value for that token in USD
function getLatestPortfolioForToken(token) {
  const response = utilityFunction().get(token);
  return response;
}

//Given a date, return the portfolio value per token in USD on that date
function getPortfolioPerTokenOnDate(date) {
  const response= utilityDateFunction(date);
  return convertMapToJson(response);
 
}

//Given a date and a token, return the portfolio value of that token in USD on that date
function getPortfolioForTokenOnDate(token, date) {
  const response = utilityDateFunction(date).get(token);
  console.log('response',response)
  return response;
}


function utilityFunction(){
  const tokenMap = new Map();
  //console.log(transactions[0].token);
  transactions.map((item) => {
    //console.log(item.token, Number(item.amount));
    if (tokenMap.has(item.token)) {
      let sum = tokenMap.get(item.token);
      if (item.transaction_type == "DEPOSIT") sum += Number(item.amount);
      else if (item.transaction_type == "WITHDRAWAL")
        sum -= Number(item.amount);
      tokenMap.set(item.token, sum);
    } else {
      if (item.transaction_type == "DEPOSIT")
        tokenMap.set(item.token, Number(item.amount));
      else if (item.transaction_type == "WITHDRAWAL")
        tokenMap.set(item.token, Number(item.amount));
    }
    //console.log(tokenMap.get(item.token));
    //console.log(tokenMap);
  });

  let totalETH = tokenMap.get("ETH");
  tokenMap.set("ETH", totalETH * ETH_IN_USD);
  let totalXRP = tokenMap.get("XRP");
  tokenMap.set("XRP", totalXRP * XRP_IN_USD);
  let totalBTC = tokenMap.get("BTC");
  tokenMap.set("BTC", totalBTC * BTC_IN_USD);

  //console.log('final', tokenMap)

  return tokenMap;
}

function utilityDateFunction(date) {
  const tokenMap = new Map();
  //console.log(transactions[0].token);
  const date1= new Date(date)
  const unixTimeStamp= Math.floor(date1.getTime() / 1000);
  transactions.map((item) => {
    //console.log(item.token, Number(item.amount));
    console.log('date', unixTimeStamp, 'item.timestamp',item.timestamp);

    if (item.timestamp<= unixTimeStamp) {
      if (tokenMap.has(item.token)) {
        let sum = tokenMap.get(item.token);
        if (item.transaction_type == "DEPOSIT") sum += Number(item.amount);
        else if (item.transaction_type == "WITHDRAWAL")
          sum -= Number(item.amount);
        tokenMap.set(item.token, sum);
      } else {
        if (item.transaction_type == "DEPOSIT")
          tokenMap.set(item.token, Number(item.amount));
        else if (item.transaction_type == "WITHDRAWAL")
          tokenMap.set(item.token, Number(item.amount));
      }
    }
    //console.log(tokenMap.get(item.token));
    //console.log(tokenMap);
  });

  let totalETH = tokenMap.get("ETH") || 0;
  tokenMap.set("ETH", totalETH * ETH_IN_USD);
  let totalXRP = tokenMap.get("XRP") || 0;
  tokenMap.set("XRP", totalXRP * XRP_IN_USD);
  let totalBTC = tokenMap.get("BTC") || 0;
  tokenMap.set("BTC", totalBTC * BTC_IN_USD);

  console.log('final', tokenMap)
  return tokenMap;
}

module.exports = {
  loadTransactionsData,
  getLatestPortfolioPerToken,
  getLatestPortfolioForToken,
  getPortfolioPerTokenOnDate,
  getPortfolioForTokenOnDate,
};
