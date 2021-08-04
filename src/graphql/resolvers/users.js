const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    register: async (parent, args, contex, info) => {
      //TODO: validate user data
      //TODO: Make sure user does already exist
      //TODO: hash password and created an auth token
      const { username, email, password, confirmPassword } = args.registerInput;

      // const user = User.findOne({ username: username });
      // if (user) {
      //   throw new UserInputError('Username is taken', {
      //     erros: {
      //       username: 'This username is taken',
      //     },
      //   });
      // }

      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        createdAt: new Date().toISOString(),
      });
      const newUserSaved = await newUser.save();
      const token = jwt.sign(
        {
          id: newUserSaved.id,
          email: newUserSaved.email,
          username: newUserSaved.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return {
        ...newUserSaved._doc,
        id: newUserSaved._id,
        token,
      };
    },
  },
};
