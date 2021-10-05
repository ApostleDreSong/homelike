const {Favorite} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');

module.exports = async (args, request) => {
    if(!request.userDetails){
        throw new Error('Unauthorized')
    }
    const {apartmentId} = args;
    const {id, email} = request.userDetails;
    // Create favorite apartment for user in db
    try {
        await Favorite.create({
            userId: id,
            apartmentId
        });
    } catch (e) {
        const sqlError = SequelizeErrorParser(e);
        throw new Error(sqlError)
    }
    return `favorite apartment created successfully for user with email: ${email}`
}