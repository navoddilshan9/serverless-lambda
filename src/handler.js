;('use strict')
var connectToDatabase = require('../config/dbConfig')
var Post = require('./collections/post')

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//       },
//       null,
//       2
//     ),
//   }
// }

module.exports.hello = async (event) => {
  const dbConnection = connectToDatabase()
  var id = '63675c843777f6bc82d8765e'
  const post = await Post.find()
  return {
    statusCode: 200,
    body: JSON.stringify(post, null, 2),
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
