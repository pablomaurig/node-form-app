'use strict';
const express = require('express');
const cors = require('cors');
const env = require('dotenv').config();
const emailRepository = require('./components/EmailRepository')

//Settings
const port = process.env.NODE_PORT || 5010;
const app = express();

//Middlewares
app.use(cors());

app.post('/', (req, res) => {
  /*let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  console.log(req.ip);
  console.log(req.ips);*/
  emailRepository.sendValidateUserMail(req.body);
  return res.send({ message: "Backend running (▧ ͜ʖ▧)" });
});

const allowCrossDomain = function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'https://orderdispatcher.herokuapp.com');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With , X-Auth-Token');
  next()
};

app.use(allowCrossDomain)

//server
try {
  app.listen(port, function () {
    console.log(`application up and running on port: ${port}`);
  });

} catch (e) {
  console.log(e.message)
}