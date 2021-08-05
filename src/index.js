const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers/resolvers');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(`mongodb://localhost:27017/merng_db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
console.log('Mongoose and DB connected');

server
  .listen({ port: 4000 })
  .then((res) => console.log(`Server runnig ar ${res.url}`));
