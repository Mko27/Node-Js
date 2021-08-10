var express = require('express');
var router = express.Router();
const UserServices = require('./services/users.service')

router.get('/', (req, res, next) => {
    res.render('users')
})

router.get('/registration', (req, res, next) => {
    res.render('usersRegistration')
})

router.get('/login', UserServices.userLogin)

router.get('/get', UserServices.getUsers)

router.get('/:id', UserServices.userById)

router.post('/', UserServices.userRegistration)

module.exports = router;