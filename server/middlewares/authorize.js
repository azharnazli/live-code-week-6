const Jokes = require('../models/jokes')
module.exports = {
  authorization: function (req, res, next) {
    Jokes.findOne({
        _id: req.params.id
      })
      .populate('owner')
      .then(data => {
        if (data.owner.email === req.authenticated.email) {
          next()
        } else {
          res.status(401).json({
            errors: {
              message: 'You dont have access'
            }
          })
        }
      })
  }
}
