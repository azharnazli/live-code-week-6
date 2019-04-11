const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')


const UserSchema = new Schema({
  email : {
    type : String,
    required : true,
    validate : [{
      validator : function(value) {
       return User.findOne({
         _id : {
           $ne : this._id
         },
         email : value
        })
          .then( found => {
            if(found) return false
          })
      },
      message : 'Email already registered'
    }],
  },
  password : String
})


UserSchema.pre('save', function(next) {
  this.password = hash(this.password)
  next()
})

let User = mongoose.model('User', UserSchema)

module.exports = User