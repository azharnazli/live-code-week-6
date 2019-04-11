const routes = require('express').Router()
const users = require('./user')
const jokes = require('./jokes/index')


routes.use('/', users)
routes.use('/', jokes)


module.exports  = routes