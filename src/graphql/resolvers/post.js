const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const allPosts = await Post.find();
        return allPosts;
      } catch (error) {
        throw new Error(error);
      }
    },

    getPost: async (_, { postId }) => {
      try {
        const foundPost = await Post.findById(postId);
        if (!foundPost) {
          throw new Error('Post not found');
        }
        return foundPost;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      console.log(user);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    likePost: async (_, { postId, context }) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
        }
      }
    },
  },
};
