const mongoose = require('mongoose')

const post = new mongoose.Schema({
  title: {
    type: 'string',
  },
  story: {
    type: 'string',
  },
  image: {
    type: 'string',
  },
  // tags: {
  //   type: 'string',
  // },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'users',
  },
})

module.exports = Post = mongoose.model('posts', post)
