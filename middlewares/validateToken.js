const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql');

module.exports = (token) => {
    const extractedToken = token.split(" ")[1];
    try {
        jwt.verify(extractedToken, process.env.PRIVATE_KEY);
        return jwt.decode(extractedToken);
    } catch (e) {
        new GraphQLError(e);
    }
}