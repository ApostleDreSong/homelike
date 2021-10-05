const {Validator} = require("node-input-validator");
const {Apartment} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');

module.exports = async (args, request) => {
    if(!request.userDetails){
        throw new Error('Unauthorized')
    }
    const {city, country, rooms, latitude, longitude} = args;
    // Validate and sanitize user inputs
    const v = new Validator({city, country, rooms, latitude, longitude}, {
        city: 'required',
        country: 'required',
        rooms: 'required',
        latitude: 'required',
        longitude: 'required',
    });
    const matched = await v.check();

    if (!matched) {
        let firstError = Object.entries(v.errors);
        throw new Error(`${firstError[0][0]}: ${firstError[0][1].message}`);
    }
    const {id} = request.userDetails;
    let apartment = {};
    // Create Apartment row in db with userId as creatorId
    try {
        apartment = await Apartment.create({
            city,
            country,
            rooms,
            latitude,
            longitude,
            creatorId: id
        })
    } catch (e) {
        const sqlError = SequelizeErrorParser(e);
        throw new Error(sqlError)
    }
    return {
        message: 'Apartment Created Successful',
        data: apartment
    };
}