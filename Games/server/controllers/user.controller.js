const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user.model.js')
const Role = require('../models/role.model.js')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const authConfig = require('../config/auth.config.js')

const getUsersIndex = async (req, res) => {
    try {
        var usersArray = await (await User.find()).reverse()
        res.render('users', { title: 'Users Database Page', users: usersArray})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

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
    var foundUser = User.findById(userId).exec((err, user) => {
        if(err) { res.status(500).json({ message: err })
        return
    }
    
    if(foundUser.role === "Administrator"){
        next()
        console.log(user.username + "is admin")
        return
    }
        res.status(403).json({ message: "Access denied! Admins only!" })
        return 
    })
}

const register = (req, res, next) => {
    const newUser = new User(req.body)
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10)

    let tmpEmail = User.findOne({ email: newUser.email })
    let tmpUsername = User.findOne({ username: newUser.username })
    
    console.log(tmpEmail)
    console.log(tmpUsername)
    
        newUser.save(function(err, user){
            if(err) {
                return res.status(400).json({ message: error.message })
            } else {
                user.hash_password = undefined
                return res.json(user)
            }
        })
}

const sign_in = (req, res, next) => {
    User.findOne({ username: req.body.username }, function(err, user){
        if(err) throw err
        if(!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid email or password'})
        }
        return res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user._id }, authConfig.secret)})
        }
    )
}

const loginRequired = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user.' })
    }
}

const profile = (req, res, next) => {
    if(req.user) {
        res.send(req.user)
        next()
    } else {
        return res.status(401).json({ message: 'Invalid token.' })
    }
}
module.exports = { getUser, getUsers, getUsersIndex,
    createUser, deleteUser, verifyToken, 
    isAdministrator,
    register, sign_in, loginRequired, profile}