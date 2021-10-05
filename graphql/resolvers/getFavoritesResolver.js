const {Favorite, Apartment} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');
const validateToken = require('../../middlewares/validateToken')

module.exports = async (args, request) => {
    if(!request.userDetails){
        throw new Error('Unauthorized')
    }
    const {id} = request.userDetails;
    let favorites = [];
    let apartments = [];
    // Get All favorite apartments in db for user
    try {
        favorites = await Favorite.findAll({
            where: {
                userId: id
            },
            include : [
                {
                    model : Apartment,
                }
            ]
        });
    } catch (e) {
        const sqlError = SequelizeErrorParser(e);
        throw new Error(sqlError)
    }
    favorites.forEach(each=>{
        const {Apartment} = each;
        apartments.push(Apartment);
    })
    return apartments
}