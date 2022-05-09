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
    
    router.post('/auth/profile', userController.profile)
    router.post('/auth/tasks', [ userController.loginRequired, userController.profile ])
    router.post('/auth/register', userController.register)
    router.post('/auth/sign_in', userController.sign_in)

module.exports = router