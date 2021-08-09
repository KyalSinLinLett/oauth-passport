const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express()

// setup a view engine
app.set('view engine', 'ejs')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to mongodb...")
    }
)
// use auth routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)


// create home route
app.get('/', (req, res) => {
    res.render('Home', { user: req.user })
})

// listen to port 3000
app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})