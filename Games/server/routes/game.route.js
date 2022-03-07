const express = require('express')
const gameController = require('../controllers/game.controller.js')
const userController = require('../controllers/user.controller.js')

const router = express.Router()

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )

    next()

    router.patch('/:id', [userController.verifyToken, userController.isAdministrator, gameController.updateGame])
    router.delete('/:id', [userController.verifyToken, userController.isAdministrator,gameController.deleteGame])
})

router.get('/', gameController.getGames)
router.get('/:id', gameController.getGame)
router.post('/', gameController.createGame)

module.exports = router
