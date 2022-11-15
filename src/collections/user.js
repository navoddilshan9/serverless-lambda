const mongoose = require('mongoose')

const user = new mongoose.Schema(
  {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    clientId: {
      type: 'string',
    },
  },
  { timestamps: true }
)

module.exports = User = mongoose.model('users', user)
