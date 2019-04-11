const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JokesSchema = new Schema({
  jokes: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


let Jokes = mongoose.model('Jokes', JokesSchema)

module.exports = Jokes