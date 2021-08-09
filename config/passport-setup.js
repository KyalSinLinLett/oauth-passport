const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})


// make passport use our strategy
passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
        (accessToken, refreshToken, profileInfo, done) => {

            User.findOne({ googleId: profileInfo.id }).then((currentUser) => {
                if (currentUser) {
                    // user already exist in db
                    console.log("User is " + currentUser)
                    done(null, currentUser)
                } else {
                    // create new user
                    console.log(profileInfo)
                    new User({
                        username: profileInfo.displayName,
                        googleId: profileInfo.id,
                        thumbnail: profileInfo._json.picture
                    }).save().then((newUser) => {
                        console.log('New user created: ' + newUser)
                        done(null, newUser)
                    })
                }
            })

        }
    )
)