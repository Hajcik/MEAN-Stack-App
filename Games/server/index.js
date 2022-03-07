const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const dbData = require('./config/dbData.json')

const gameRoutes = require('./routes/game.route.js')
const userRoutes = require('./routes/user.route.js')

const app = express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/games', gameRoutes)
app.use('/users', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(dbData.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( ()  => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch( () => console.log(error.message))