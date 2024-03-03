const express = require("express");
const Router = express.Router();
const User = require('../Controller/User');

Router.post('/signup',User.SignupUser)
Router.post('/login',User.login)

module.exports = Router
