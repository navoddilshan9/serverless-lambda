;('use strict')
var connectDB = require('../../config/dbConfig')
var User = require('../collections/user')

module.exports.create = async (event, context, callback) => {
  await connectDB()
  console.log('body')
  console.log(event.request.userAttributes)
  saveUser(event.request.userAttributes)
  callback(null, event)
}

const saveUser = async (userAttributes) => {
  console.log(userAttributes['email'])
  await User.find({
    email: userAttributes.email,
  })
    .then(async (currentUser) => {
      console.log('currentUser')
      console.log(currentUser)

      if (!currentUser) {
        const user = new User({
          firstName: userAttributes['custom:firstName'],
          lastName: userAttributes['custom:lastName'],
          email: userAttributes.email,
        })
        user.save().then((nuser) => {
          console.log(nuser)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
