console.log("----  Welcome to Tutor Bin Assignment ----");

const fs = require("fs");
const http = require("http");
require("dotenv").config();
console.log("xxxxx");

const app = require("./app");

const PORT = process.env.PORT || 8000;
console.log(PORT)
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
