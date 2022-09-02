const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan');
const api = require('./routes/api');


const app = express();

app.use(helmet());
console.log("Helmet instantiated....");

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(morgan('combined'))
app.use(express.json());

app.use('/v1', api);


module.exports = app;