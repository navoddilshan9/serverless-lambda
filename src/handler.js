import { connectToDatabase } from '../config/dbConfig'
;('use strict')

module.exports.hello = async (event) => {
  const dbConnection = connectToDatabase()
  const posts = await getPost(dbConnection, 'posts')
  return {
    statusCode: 200,
    body: JSON.stringify(posts),
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

let getAllPost = (db, table) => {
  return db.collection(table).findAll()
}
