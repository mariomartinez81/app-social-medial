const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    body: String,
    username: String,
    createdAt: String,
    comments: [
      {
        body: String,
        username: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model('Post', PostSchema);
