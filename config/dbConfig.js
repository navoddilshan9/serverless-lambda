const MongoClient = require('mongodb').MongoClient

let cachedDb = null

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log('user existinbg connection')
    return Promise.resolve(cachedDb)
  } else {
    return MongoClient.connect(process.env.MONGODB_URI, {
      native_parser: true,
      useUnifiedToplogy: true,
    })
      .then((client) => {
        let db = client.db('BlogPost')
        console.log('New databse Connection')
        cachedDb = db
        return cachedDb
      })
      .catch((error) => {
        console.log('Mongo connection error')
        console.log(error)
      })
  }
}
