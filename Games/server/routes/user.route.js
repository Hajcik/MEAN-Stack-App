const express = require('express')
const userController = require('../controllers/user.controller.js')

const router = express.Router()

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )
    
    next()

    
    
})

    router.get('/:id', userController.getUser)
    router.post('/', userController.createUser)
    router.get('/', userController.getUsers)
    router.delete('/:id', userController.deleteUser)
    router.get('/verifyToken', userController.verifyToken)
    router.get('/isAdministrator/:id', userController.isAdministrator)
    router.get('/emailDuplication', userController.emailDuplication)
    router.get('/usernameDuplication', userController.usernameDuplication)
    
module.exports = router