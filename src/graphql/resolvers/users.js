const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

module.exports = {
  Mutation: {
    register: async (parent, args, contex, info) => {
      //TODO: validate user data
      //TODO: Make sure user does already exist
      //TODO: hash password and created an auth token
      const { username, email, password, confirmPassword } = args.registerInput;
      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password,
        confirmPassword,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
