# oauth-passport
Implementation of OAuth2.0 in nodejs using the passport.js library
- based on the tutorial series by The Net Ninja


## Project setup

```
npm install
```

## create a keys.js file under `/config`
```
touch keys.js
```
## fill it with secret information
```
module.exports = {
    google: {
        clientID: '',
        clientSecret: ''
    },
    mongodb: {
        dbURI: ''
    },
    session: {
        cookieKey: ''
    }
}
```
## run project
```
nodemon app.js
```
