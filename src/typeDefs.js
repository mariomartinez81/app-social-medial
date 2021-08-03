const gql = require('graphql-tag');
const Post = require('./models/Post');
const User = require('./models/User');

const typeDefs = gql`
  type Post {
    id: ID
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    sayHi: String! # !  meaning is a required in graphql
    getPosts: [Post]
  }
`;

module.exports = typeDefs;
