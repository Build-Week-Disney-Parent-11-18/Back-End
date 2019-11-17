const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json('Hello World')
});

module.exports = server;