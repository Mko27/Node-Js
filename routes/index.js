const express = require('express')
const router = express.Router()
const regionsRouter = require('./regions.api')
const citiesRouter = require('./cities.api')
const usersRouter = require('./users.api')
const categoryRouter = require('./category.api')
const productsRouter = require('./products.api')

router.use('/reg', regionsRouter)
router.use('/cities', citiesRouter)
router.use('/users', usersRouter)
router.use('/category', categoryRouter)
router.use('/products', productsRouter)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
