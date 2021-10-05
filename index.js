var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');
const {sequelize} = require('./models');
const schema = require('./graphql/types');
const root = require('./graphql/resolvers');
const {altairExpress} = require('altair-express-middleware');
const validateToken = require("./middlewares/validateToken");

require('dotenv').config();
sequelize.sync();

const authMiddleware = (req, res, next) => {
    if (req.headers.authorization) {
        req.userDetails = validateToken(req.headers.authorization);
    }
    next();
}

var app = express();
app.use(express.json());

app.use('/playground', altairExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`,
}));

app.use(authMiddleware);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');