const {Apartment} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');
const {Op} = require("sequelize");
const distanceCalculator = require('../../utilities/distanceCalculator');

module.exports = async (args, request) => {
    if (!request.userDetails) {
        throw new Error('Unauthorized')
    }
    const {city, country, rooms, latitude, longitude, distance} = args;
    if (distance) {
        if (!latitude || !longitude) {
            throw new Error('Current user\'s coordinates(Latitude and Longitude) must be provided to filter by distance. Either provide them or remove the distance filter')
        }
    }
    let apartments = [];
    // Get All favorite apartments in db for user
    let filterOptions = [];
    if(city){
        filterOptions.push({
            city: {
                [Op.like]: city,
            }
        })
    }
    if(country){
        filterOptions.push({
            country: {
                [Op.like]: country,
            }
        })
    }
    if(rooms){
        filterOptions.push({
            rooms: {
                [Op.eq]: rooms,
            }
        })
    }
    try {
        apartments = await Apartment.findAll({
            where: {
                [Op.and]: filterOptions
            }
        });
        if (distance) {
            let filteredApartmentsByDistance = [];
            apartments.forEach(apartment => {
               let calculatedDistance = distanceCalculator(apartment.latitude, latitude, apartment.longitude, longitude);
                if (calculatedDistance <= distance){
                    filteredApartmentsByDistance.push(apartment);
               }
            })
            return filteredApartmentsByDistance;
        }
    } catch (e) {
        const sqlError = SequelizeErrorParser(e);
        throw new Error(sqlError)
    }
    return apartments
}