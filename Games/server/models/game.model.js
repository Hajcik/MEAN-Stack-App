const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    title: String,
    developer: String,
    publisher: String,
    tags:[String],
    year:{
        type: Number,
        default: 1990
    }
})

const GameInfo = mongoose.model('GameInfo', gameSchema)
module.exports = GameInfo