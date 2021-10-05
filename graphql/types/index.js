const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type User{
        id: Int,
        firstName: String!,
        lastName: String!,
        email: String!,
        password: String!,
    }
     type Apartment{
        id: Int!,
        city: String!,
        country: String!,
        rooms: Int!,
        latitude: Float!,
        longitude: String!,
        creatorId: Int!
    }
    type RegisterResponse{
        message: String!,
        data:User
    }
     type ApartmentResponse{
        message: String!,
        data:Apartment
    }
  
    type Query {
        getApartments:[Apartment]
        getFavoriteApartments: [Apartment]
    }
  
    type Mutation {
        register(firstName: String!, lastName: String!, email: String!, password: String!): RegisterResponse
        authenticate(email: String!, password: String!): String!
        createApartment(city: String!, country: String!, rooms: Int!, latitude: Float!, longitude: Float!): ApartmentResponse
        markApartmentAsFavorite(apartmentId: Int!): String!
        searchForApartments(city: String, country: String, rooms: Int, latitude: Float, longitude: Float, distance: Int): [Apartment]
    }
`);