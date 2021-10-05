const registerResolver = require('./registerResolver.js');
const authenticateResolver = require('./authenticateResolver.js');
const createApartmentResolver = require('./createApartmentResolver.js');
const getApartmentsResolver = require('./getApartmentsResolver.js');
const getFavoritesResolver = require('./getFavoritesResolver.js');
const markApartmentAsFavorite = require('./markApartmentAsFavorite.js');
const searchForApartments = require('./searchForApartments.js');

module.exports = {
    register: (args) => {
        return registerResolver(args);
    },
    authenticate: (args) => {
        return authenticateResolver(args);
    },
    createApartment: (args, request) => {
        return createApartmentResolver(args, request)
    },
    getApartments:  (args, request) => {
        return getApartmentsResolver(args, request);
    },
    getFavoriteApartments: (args, request) => {
        return getFavoritesResolver(args, request)
    },
    markApartmentAsFavorite: (args, request) => {
        return markApartmentAsFavorite(args, request)
    },
    searchForApartments: (args, request) => {
        return searchForApartments(args, request)
    }
};