const Post = require('./models/Post');
const User = require('./models/User');

const resolvers = {
  Query: {
    sayHi: () => 'Hello World ',

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

module.exports = resolvers;
