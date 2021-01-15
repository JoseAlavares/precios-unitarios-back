require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const fileUpload = require("express-fileupload")
const sequelize = require(`${__dirname}/src/config/database-connection`)
require(`${__dirname}/src/models/associations`)
const app = express()
const cookieParser = require('cookie-parser')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())
app.use(cookieParser())
app.use(passport.initialize())
//app.use(passport.session())

let opts = {}
opts.jwtFromRequest = function(req) { // tell passport to read JWT from cookies
    var token = null;
    if (req && req.cookies){
        token = req.cookies['jwt']
    }
    return token
}
opts.secretOrKey = "1234"//config.secretOrKey

// main authentication, our app will rely on it
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT BASED AUTH GETTING CALLED") // called everytime a protected URL is being served
    if (jwt_payload.data) {
        return done(null, jwt_payload.data)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false)
    }
}))

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID || "123333353433-7bfropt1k56p4sa32k99lpbe0k43ag09.apps.googleusercontent.com",
    clientSecret: process.env.CLIENT_SECRET ||"j6HqDtv_9eko-6t1wPcbfn2v",
    callbackURL: process.env.REDIRECT_URI || "http://localhost:3005/api/v1/googleRedirect"
  },
  function(accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
))

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function(user, done) {
    //console.log('I should have jack ')
    done(null, user)
})
passport.deserializeUser(function(obj, done) {
    //console.log('I wont have jack shit')
    done(null, obj)
})


const PORT = process.env.APP_PORT

app.get('/', (req, resp) => {
    return resp.status(200).json({
        message: 'Welcome to PRECIOS UNITARIOS API v1',
        time_stamp: new Date().toISOString()
    })
})

app.use('/api/v1', require(`${__dirname}/src/router`))

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connection")
    } catch(err) {
        console.error(err)
    }
    
})