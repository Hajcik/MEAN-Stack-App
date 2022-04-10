const cors = require('cors')
const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const dbData = require('./config/dbData.json')
const path = require('path')

const gameRoutes = require('./routes/game.route.js')
const userRoutes = require('./routes/user.route.js')
const indexRoutes = require('./routes/index.route.js')
const { config } = require('process')
const authConfig = require('./config/auth.config')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/api/games', gameRoutes)
app.use('/api/users', userRoutes)
app.use('/', indexRoutes)

const PORT = process.env.PORT || 5000

app.use(function(req, res, next) {
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
                jsonwebtoken.verify(req.headers.authorization.split(' ')[1], authConfig.secret, function(err, decode) {
                        if(err) req.user = undefined
                        req.user = decode
                        next()
                })
        } else {
                req.user = undefined
                next()
        }
})

app.use(function(req, res) {
        res.status(404).json({ url: req.originalUrl + ' not found'})
})

mongoose.connect(dbData.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( ()  => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch( () => console.log(error.message))

 
module.exports = app