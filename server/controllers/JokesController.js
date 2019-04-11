const axios = require('axios')
const Jokes = require('../models/jokes')

class JokesController {

  static generateJokes(req, res) {
    axios.get('https://icanhazdadjoke.com/', {
        headers: {
          "Accept": `application/json`
        }
      })
      .then(({
        data
      }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addFavorite(req, res) {
    Jokes.create({
        jokes: req.body.jokes,
        owner: req.authenticated.id
      })
      .then((joke) => {
        res.status(201).json(joke)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static myData(req, res) {
    Jokes.find({
        owner: req.authenticated.id
      })
      .then((jokes) => {
        res.status(200).json(jokes)
      }).catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteJokes(req, res) {
    Jokes.deleteOne({
      _id: req.params.id,
      owner: req.authenticated.id
    })
      .then((data)=> {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}


module.exports = JokesController