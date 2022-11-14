;('use strict')
var connectDB = require('../../config/dbConfig')
var User = require('../collections/user')

module.exports.create = (event, context, callback) => {
  saveUser(event.request.userAttributes)
}

const saveUser = async (userAttributes, event, callback) => {
  await connectDB()
  await User.find({
    email: userAttributes.email,
  })
    .then(async (currentUser) => {
      if (currentUser.length === 0) {
        const user = new User({
          firstName: userAttributes['custom:firstName'],
          lastName: userAttributes['custom:lastName'],
          email: userAttributes.email,
        })
        user.save().then((nuser) => {
          console.log(nuser)
          callback(null, event)
        })
      } else {
        console.log('user existing')
        callback(null, event)
      }
    })
    .catch((err) => {
      console.log(err)
      callback(null, event)
    })
}
