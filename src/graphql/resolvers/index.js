const postsResolvers = require('./post');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
    ...commentsResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
