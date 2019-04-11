const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')


class UserController{

  static createUser(req, res) {

    User.create(req.body)
      .then((user)=> {
        res.status(201).json(user)
      })
      .catch((err)=> {
        res.status(500).json(err)
      })
  }

  static loginUser(req, res) {

    User.findOne({
      email : req.body.email
    })
      .then((user) => {
        if(!user) {
          res.status(400).json({error : {error : 'email or password not found'}})
        } else {
          if(!compare(req.body.password, user.password)) {
            res.status(400).json({error : 'email or password not found'})
          } else {
            let token = sign({
              email :  user.email,
              id : user._id
            })
            res.status(200).json(token)
          }
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    }

}


module.exports = UserController