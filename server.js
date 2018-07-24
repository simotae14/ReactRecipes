const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({
    path: 'variables.env'
});
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Recupera il middleware GraphQL-Express
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Connects to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// Initializes application
const app = express();

// Creo la GraphiQL app
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});