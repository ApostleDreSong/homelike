# Homelike
1. git clone https://github.com/ApostleDreSong/homelike.git homelike
2. cd into homelike
3. Change config details for database in config/config.json
4. run npm install
5. Create a .env file and provide the needed options
6. use the command "npm start" to create an instance of the App.
7. Use the graphql playground on http://localhost:4000/playground for queries and mutations. Detailed documentation, input types and return types can also be found on the playground
#Documentation<br />
###Mutations
    - register  - the get apartments mutation accepts registration details and returns the id alongside registration details
    - authenticate - authenticate mutation accepts email, password and returns a token that expires every 30 minutes
    - createApartment - createApartment mutation accepts location parameters including the coordinates(latitude & longitude) of the apartment and returns a sucess message and Apartment data. Latitude and Longitude are required to enable us calculate distance between two points
    - markApartmentAsFavorite - markApartmentAsFavorite mutation takes in the apartmentId as argument and returns the Apartment details. apartmentId can be gotten from the query getApartments
    - searchForApartments - this mutation takes in arguments, including substrings like city, countries. Where location is passed as argument, current searchers coordinates(latitude & longitude) are required to calculate the distance in Kilometers. This mutation returns an array of Apartments 
###Queries
    - getApartments - the get apartments query returns an array of apartments
    - getFavoriteApartments - the get favorites apartment returns the favorited apartments by the logged in user


#For Tests
use "npm run test" command

The test focuses only on sanitizing and validating the graphql resolver inputs.