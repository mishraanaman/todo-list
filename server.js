const http = require('http');

const app = require('./app');
const { loadTransactionsData } = require("./models/transactions.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadTransactionsData();
  
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
