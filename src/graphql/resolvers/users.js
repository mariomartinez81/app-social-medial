const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators');

//function generate token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

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
    login: async (parent, args, context, info) => {
      const { username, password } = args;
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const findUser = User.findOne({ username });
      if (!findUser) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await User.comparePassword(password, findUser.password);

      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = generateToken(findUser);
      return {
        ...findUser._doc,
        id: findUser._id,
        token,
      };
    },

    register: async (parent, args, context, info) => {
      //data input by args
      const { username, email, password, confirmPassword } = args.registerInput;

      //TODO: validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      //TODO: Make sure user does already exist

      const foundUser = await User.findOne({ username });
      if (foundUser) {
        throw new UserInputError('Username is taken', {
          error: {
            username: 'This username is taken',
          },
        });
      }

      //TODO: hash password and created an auth token and created new user
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        createdAt: new Date().toISOString(),
      });
      const newUserSaved = await newUser.save();

      const token = generateToken(newUserSaved);

      return {
        ...newUserSaved._doc,
        id: newUserSaved._id,
        token,
      };
    },
  },
};
