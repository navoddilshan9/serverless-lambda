;('use strict')
var connectDB = require('../config/dbConfig')
var Post = require('./collections/post')

module.exports.getAll = async (event) => {
  await connectDB()
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Blogs cannot find',
      },
      null,
      2
    ),
  }
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
            message: 'Blogs cannot find!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  return body
}

module.exports.create = async (event) => {
  await connectDB()
  console.log('body')
  console.log(event)
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Blog cannot create',
      },
      null,
      2
    ),
  }

  const post = new Post(event)
  await post
    .save()
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
            message: 'Blog cannot created!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  return body
}

module.exports.update = async (event) => {
  console.log('body')
  console.log(event)

  await connectDB()
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Blog cannot update',
      },
      null,
      2
    ),
  }
  await Post.findOneAndUpdate({ _id: event._id }, event)
    .then((blog) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: blog,
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
            message: 'Blog cannot update!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  return body
}

module.exports.delete = async (event) => {
  await connectDB()
  console.log(event)
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Blog cannot deleted!',
      },
      null,
      2
    ),
  }
  await Post.findByIdAndRemove(event.blogid)
    .then((blog) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: blog,
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
            message: 'Blog cannot deleted!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  return body
}
