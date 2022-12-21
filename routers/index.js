const express = require('express');
const otp = require('../controllers/user')
const router = express.Router();
require('../controllers/googauth');





const { register, login,resPassword, logout, otpsignup, otpverify, forgetPass,otpmobsignup } = require('../controllers/user')
// const  { googleoauth2 } = require('../controllers/googauth')


router.post('/signup', register)   
router.post('/login', login)
//router.post('/change_password', chanpass)
router.post('/logout', logout)
router.post('/forget_password', forgetPass);
router.post('/otpverify/:otpPassToken', otpverify);
router.post('/otpmobsignup',otpmobsignup)   

router.post('/reset_password/:userId/:resPasstoken', resPassword);
router.post("/otpsignup", otpsignup);

// router.get("/googleauth",googleoauth2);

module.exports = router;
//