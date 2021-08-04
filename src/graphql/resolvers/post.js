const Post = require('../../models/Post');

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
  },
};
