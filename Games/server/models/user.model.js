const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    } ,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password)
}

const User = mongoose.model('User', userSchema)
module.exports = User