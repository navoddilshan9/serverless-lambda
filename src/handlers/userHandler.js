;('use strict')
var connectDB = require('../../config/dbConfig')
var User = require('../collections/user')

module.exports.create = async (event) => {
  await connectDB()
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Blog cannot deleted!',
      },
      null,
      2
    ),
  }
  const user = new User({
    firstName: event.firstName,
    lastName: event.lastName,
    email: event.email,
  })
  user
    .save()
    .then((nuser) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: nuser,
          },
          null,
          2
        ),
      }
    })
    .catch(() => {
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'user cannot register!',
            error: err,
          },
          null,
          2
        ),
      }
    })
  return body
}
