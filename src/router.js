const passport = require('passport')
const express = require("express")
const router = express.Router()
const middleware = require("./middlewares/auth.middleware")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GoogleStrategy = require('passport-google-oauth20').Strategy

const opts = {
    jwtFromRequest: function(req) {
        let token = null
        if(req && req.cookies) {
            token = req.cookies['jwt']
        }

        return token
    },
    secretOrKey: 'secret'
}

router.get("/", (req, resp) => {
    return resp.status(200).json({
        time_stamp: new Date().toISOString(),
        message: "Welcome to Precios unitarios"
    })
})

//imports
const MODULES_ROUTES = `${__dirname}/modules`

//Authentication 
const { authentication } = require(`${MODULES_ROUTES}/authentication/network/authentication.network`)

//Company
const { createCompany } = require(`${MODULES_ROUTES}/company/company.network`)

//User
const { registerUser } = require(`${MODULES_ROUTES}/user/user.network`)

//Registry
const { register } = require(`${MODULES_ROUTES}/registry/register-user-company.network`)

//Plan
const { getAllPlans } = require(`${MODULES_ROUTES}/plan/get-all-plans.network`)

//Authentication services
router
    .post('/authentication', middleware.checkApiKey, authentication)
    //.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))
    //.get('/googleRedirect', passport.authenticate('google'), googleRedirect)
    //.post('/validate-token', middleware.isLoggedIn, validToken)

//Company services
router
    .post('/company', middleware.checkApiKey, createCompany)

//User services
router
    .post('/register', middleware.checkApiKey, registerUser)

router
    .post('/registry',middleware.checkApiKey, register)

router    
    .get('/plan', getAllPlans)    

module.exports = router;

//https://console.developers.google.com/apis/credentials/oauthclient/?project=${your_project_number}