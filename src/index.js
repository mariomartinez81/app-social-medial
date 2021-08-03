const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

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
  .listen({ port: 5000 })
  .then((res) => console.log(`Server runnig ar ${res.url}`));
