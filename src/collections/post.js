const mongoose = require('mongoose')

const post = new mongoose.Schema({
  title: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
})

module.exports = Post = mongoose.model('posts', post)
