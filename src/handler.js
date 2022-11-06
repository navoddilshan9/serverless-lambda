;('use strict')
var connectToDatabase = require('../config/dbConfig')
var Post = require('./collections/post')
module.exports.hello = async (event) => {
  const dbConnection = connectToDatabase()
  var id = '63675c843777f6bc82d8765e'
  const post = await Post.findOne()
  return {
    statusCode: 200,
    body: JSON.stringify(post),
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
