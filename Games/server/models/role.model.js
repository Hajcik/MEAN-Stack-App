const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        default: "User"
    }
})

const Role = mongoose.model('Role', roleSchema)
module.exports = Role