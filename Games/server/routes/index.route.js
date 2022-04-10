const express = require('express')
const indexController = require('../controllers/index.controller.js')

const router = express.Router()

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )

    next() 
})

router.get('/', indexController.getIndex)

module.exports = router