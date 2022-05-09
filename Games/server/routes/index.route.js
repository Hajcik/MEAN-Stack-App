const express = require('express')
const indexController = require('../controllers/index.controller.js')
const userController = require('../controllers/user.controller.js')
const gamesController = require('../controllers/game.controller.js')
const router = express.Router()

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )

    next() 
})

router.get('/', indexController.getIndex)
router.get('/users', userController.getUsersIndex)
router.get('/games', gamesController.getGamesIndex)

router.get('/login', indexController.getLoginPage)
router.get('/register', indexController.getRegisterPage)

module.exports = router