const {Apartment} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');

module.exports = async (args, request) => {
    if(!request.userDetails){
        throw new Error('Unauthorized')
    }
    let apartments = [];
    // Get All apartments in db
    try {
        apartments = await Apartment.findAll();
    } catch (e) {
        const sqlError = SequelizeErrorParser(e);
        throw new Error(sqlError)
    }
    return apartments
}