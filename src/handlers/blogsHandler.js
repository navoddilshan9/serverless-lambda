;('use strict')
var connectDB = require('../../config/dbConfig')
var Post = require('../collections/post')

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME

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

module.exports.findById = async (event) => {
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Error in Request!',
      },
      null,
      2
    ),
  }
  console.log(event._id)
  await Post.findById(event._id)
    .then((blog) => {
      console.log(blog)
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
            message: 'Blog cannot find!',
            error: err,
          },
          null,
          2
        ),
      }
    })

  return body
}

module.exports.findbyidWriter = async (event) => {
  let body = {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: 'Error in Request!',
      },
      null,
      2
    ),
  }
  await Post.find({
    write: event._id,
  })
    .then((blogs) => {
      body = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: blogs,
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

module.exports.upload = async (event) => {
  console.log(event)

  const response = {
    isBase64Encoded: false,
    statusCode: 200,
    body: JSON.stringify({ message: 'Successfully uploaded file to S3' }),
  }

  try {
    const parsedBody = JSON.parse(event.body)
    const base64File = parsedBody.file
    const decodedFile = Buffer.from(
      base64File.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    )
    const params = {
      Bucket: BUCKET_NAME,
      Key: `images/${new Date().toISOString()}.jpeg`,
      Body: decodedFile,
      ContentType: 'image/jpeg',
    }

    const uploadResult = await s3.upload(params).promise()

    response.body = JSON.stringify({
      message: 'Successfully uploaded file to S3',
      uploadResult,
    })
  } catch (e) {
    console.error(e)
    response.body = JSON.stringify({
      message: 'File failed to upload',
      errorMessage: e,
    })
    response.statusCode = 500
  }

  return response
}
