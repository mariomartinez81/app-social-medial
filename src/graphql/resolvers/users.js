const User = require('../../models/User');

module.exports = {
  Mutation: {
    register(parent, args, contex, info) {
      //TODO: validate user data
      //TODO: Make sure user does already exist
      //TODO: hash password and created an auth token
    },
  },
};
