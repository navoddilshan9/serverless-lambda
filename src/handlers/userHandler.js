;('use strict')
var connectDB = require('../../config/dbConfig')
var User = require('../collections/user')

module.exports.create = async (event, context, callback) => {
  await connectDB()
  console.log('body')
  console.log(event)
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

  return body
}
