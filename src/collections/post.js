const mongoose = require('mongoose')

const post = new mongoose.Schema(
  {
    title: {
      type: 'string',
    },
    story: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    tags: {
      type: 'string',
    },
    writer: {
      type: 'string',
    },
  },
  { timestamps: true }
)

module.exports = Post = mongoose.model('posts', post)
