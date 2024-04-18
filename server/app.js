const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const corsMiddleware = require('./cors.js');

const app = express();

app.use(cors({
    origin: [
        "https://pomotask-ten.vercel.app",
        "pomotask-ten.vercel.app"
    ],
    optionsSuccessStatus: 200 || 204,)
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', corsMiddleware, require('./src/v1/routes'));

module.exports = app;
