console.log("----💰💰  Welcome to Crypto Portfolio Viewer  💰💰----");

const http = require('http');
require('dot-env').config();
const app = require('./app');
const { loadTransactionsData } = require("./models/transactions.model.js");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadTransactionsData();
  
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
