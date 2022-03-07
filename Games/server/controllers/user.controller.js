const mongoose = require('mongoose')
const User = require('../models/user.model.js')
const Role = require('../models/role.model.js')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')

const getUsers = async (req, res) => {
    try {
        const usersInfo = await (await User.find()).reverse()
        res.status(200).json(usersInfo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    try { 
        const userInfo = await (await User.findById(id))
        res.status(200).json(userInfo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body
    const newUser = new User({ username, email, password, roles })
    try {
        await newUser.save()
        res.status(201).json(newUser)
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const emailDuplication = async (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if(err) { res.status(500).send({ message: err })
        return
        }

        if(user) { res.status(400).send({ message: 'Email taken' })}
    })
}

const usernameDuplication = async (req, res) => {
    User.findOne({ username: req.body.username }).exec((err, user) =>{
        if(err) { res.status(500).send({ message: err })
        return
        }

        if(user) { res.status(400).send({ message: 'Username taken' })}
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with ID: ${id}`)
    await User.findByIdAndRemove(id)
    return res.json({ message: 'User deleted succesfully!' })
}

// Authorization

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token) { return res.status(403).json({ message: "No token provided" })}

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) { return res.status(401).json({ message: 'Unauthorized' })
    }
    req.userId = decoded.id
    next()
    })
}

const isAdministrator = (req, res, next) => {
    const { userId } = req.params
    User.findById(userId).exec((err, user) => {
        if(err) { res.status(500).json({ message: err })
        return
    }
    Role.find({ _id: { $in: user.roles }}, (err, roles) => {
        if(err) { res.status(500).json({ message: err })
        return
        }

        for(let i = 0; i < roles.length; i++) {
            if(roles[i].name === "Administrator"){
                console.log('administrator!')
                next()
                return
            }
        }

        res.status(403).json({ message: "Access denied! Admins only!" })
        return
        })
    })
}

module.exports = { getUser, getUsers, 
    createUser, deleteUser, verifyToken, 
    isAdministrator, usernameDuplication, emailDuplication }