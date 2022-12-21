
const { default: mongoose } = require('mongoose');

const passport = require('passport')
// const findOrCreate = require('mongoose-findorcreate')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
  // const app = express()
  // const express = require('express')
const User = require( "../model/user")



// passport.serializeUser((user,done) => {
//   done(null, user.id);
// })

// passport.deserializeUser((user,done) => {
//   done(null,user.id);
// })
// userSchema.plugin(findOrCreate)

// passport.use(User.createStrategy());


passport.use(new GoogleStrategy({
    clientID: "1057863898334-d62i8vrm4653deh1iqtdi7kklmbr29bl.apps.googleusercontent.com" ,
    clientSecret:"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",
    callbackURL: "http://localhost:9999/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },

  function (request, accessToken, refreshToken, profile, done) {
    const user = new User({

      id:         profile.id,
      username:   profile.emails[0].value,
      source:     "google",
      
    });
   
    User.findOne({ username: user.username })
      .then((data) => {
        if (data) {
          User.updateOne({}, { token: token, source: "google" }).then(
            (info) => {}
          );
          done(null, data);
        } else {
          data = User.create(user);
          done(null, data);
        }
      })
      .catch((error) => {
        res.status(500).json({ err: error });
      });
  }
));


// Alternate Code

exports.googleoauth2 = (passport.authenticate('google', { scope: ["profile","email"]}) 
);


exports.googlecallback = (passport.authenticate('google', (req,res)=>{

}))










