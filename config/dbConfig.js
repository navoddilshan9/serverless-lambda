// const MongoClient = require('mongodb').MongoClient

// let cachedDb = null
// const URI =
//   'mongodb+srv://navod:6IgeMs7QNHAaiaJD@cluster0.dnos9jm.mongodb.net/?retryWrites=true&w=majority'
// const connectToDatabase = async () => {
//   if (cachedDb) {
//     console.log('user existinbg connection')
//     return Promise.resolve(cachedDb)
//   } else {
//     return MongoClient.connect(URI, {
//       native_parser: true,
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     })
//       .then((client) => {
//         let db = client.db('blog_post')
//         console.log('New databse Connection')
//         cachedDb = db
//         return cachedDb
//       })
//       .catch((error) => {
//         console.log('Mongo connection error')
//         console.log(error)
//       })
//   }
// }

// module.exports = connectToDatabase

const mongoose = require('mongoose')

const URI =
  'mongodb+srv://navod:6IgeMs7QNHAaiaJD@cluster0.dnos9jm.mongodb.net/blog_posts?retryWrites=true&w=majority'

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('DB connected ....')
}

module.exports = connectDB
