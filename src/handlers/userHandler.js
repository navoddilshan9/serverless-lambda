;('use strict')
var connectDB = require('../../config/dbConfig')
var User = require('../collections/user')

module.exports.create = async (event) => {
  await connectDB()
  console.log('body')
  console.log(event)
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'User cannot register!',
      },
      null,
      2
    ),
  }

  const user = new User(event)
  await user
    .save()
    .then((user) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: user,
          },
          null,
          2
        ),
      }
    })
    .catch((err) => {
      body = {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'Blog cannot register!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  return body
}
