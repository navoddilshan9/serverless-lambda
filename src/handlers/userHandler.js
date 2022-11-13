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
  console.log(userAttributes.email)
  await User.findById({
    email: userAttributes['email'],
  })
    .then(async (currentUser) => {
      console.log('currentUser')
      console.log(currentUser)
      if (currentUser) {
        console.log('User existing')
      } else {
        const user = new User({
          firstName: userAttributes['custom:firstName'],
          lastName: userAttributes['custom:lastName'],
          email: userAttributes['email'],
        })
        await user
          .save()
          .then((user) => {
            console.log('new user added')
            console.log(user)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
