const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    sayHi: String! # !  meaning is a required in graphql
  }
`;

module.exports = typeDefs;
