const express = require('express')
const OTPdb = require('./model/otp')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Route = require('./routers/index')
const passport = require("passport")
const goauth = require('passport-google-oauth20')
const ejs = require('ejs')
const app = express()
require('dotenv').config();

// const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const emailRegxp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// app.use(express.static("public"));
// app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/login-app-forgPass', {
})


// app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use('/', Route)
// app.use('/', express.static(path.join(__dirname, 'static')))


// CONNECTION ESTABLISHMENT CHECK 
app.listen(9999, () => {
	console.log('Server up at 9999')
})
