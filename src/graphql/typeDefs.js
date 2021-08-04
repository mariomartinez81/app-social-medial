const gql = require('graphql-tag');
const Post = require('../models/Post');
const User = require('../models/User');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Query {
    sayHi: String! # !  meaning is a required in graphql
    getPosts: [Post]
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

module.exports = typeDefs;
