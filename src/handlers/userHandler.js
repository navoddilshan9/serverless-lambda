;('use strict')
var connectDB = require('../../config/dbConfig')
var User = require('../collections/user')

module.exports.create = async (event, context, callback) => {
  await connectDB()
  console.log('body')
  console.log(event)
  const user = new User(event)
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'User cannot create',
      },
      null,
      2
    ),
  }
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
            message: 'user cannot created!',
            error: err,
          },
          null,
          2
        ),
      }
    })
  callback(null, event)
  return body
}
