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
  const values = Object.values(userAttributes)

  await User.findById({
    email: values[2],
  })
    .then(async (currentUser) => {
      console.log('currentUser')
      console.log(currentUser)
      if (currentUser) {
        console.log('User existing')
      } else {
        const user = new User({
          firstName: values[0],
          lastName: values[1],
          email: values[2],
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
