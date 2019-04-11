const routes = require('express').Router()
const JokesController = require('../../controllers/JokesController')

const authenticated = require('../../middlewares/authenticate')
const { authorization } = require('../../middlewares/authorize')

routes.get('/getJokes', JokesController.generateJokes)

routes.use(authenticated)
routes.post('/favorites', JokesController.addFavorite)
routes.get('/favorites', JokesController.myData)
routes.delete('/favorites/:id', authorization, JokesController.deleteJokes)


module.exports = routes