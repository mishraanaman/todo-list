const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
console.log("xxFFx");

const api = require('./routes/api');
console.log("xxxxx");

const app = express();

app.use(helmet());


app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());
console.log('xxxxx')

app.use('/v1', api);


module.exports = app;