const mongoose = require('mongoose')

const post = new mongoose.Schema({
  title: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
})

module.exports = User = mongoose.model('posts', post)
