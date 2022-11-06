;('use strict')
var connectDB = require('../config/dbConfig')
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
  await connectDB()

  await Post.find()
    .then((post) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: post,
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
            message: 'Store cannot find!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
