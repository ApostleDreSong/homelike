# Homelike
1. git clone https://github.com/ApostleDreSong/homelike.git homelike
2. cd into homelike
3. Change config details for database in config/config.json
4. run npm install
5. Create a .env file and provide the needed options - options to provide are included in .env.sample file at the root of the project
6. use the command "npm start" to create an instance of the App.
7. Use the graphql playground on http://localhost:4000/playground for queries and mutations. Detailed documentation, input types and return types can also be found on the playground
# Documentation<br />
To use the other endpoints apart from register or authenticate, pass the bearer token gotten from the authorize mutation as an authorization header.
Click on the settings icon by the left of the playground to reveal options to add headers
```graphql endpoint doc
"Authorization: "Bearer tokenizedstringottenfromauthorizemutation"
```
### Mutations
     Register  - the get apartments mutation accepts registration details and returns the id alongside registration details

``` graphql endpoint doc

mutation {
     register(firstName: "Lovely", lastName: "Human", email: "hr@homelike.com", password: "homelikePropTech") {
        message
        data {
        id
        firstName
        lastName
        email
        }
    }
}
```
    Authenticate - authenticate mutation accepts email, password and returns a token that expires every 30 minutes
```graphql endpoint doc

    mutation {
      authenticate(email: "hr@homelike.com", password: "homelikePropTech")
    }
```
    CreateApartment - createApartment mutation accepts location parameters including the coordinates(latitude & longitude) of the apartment and returns a sucess message and Apartment data. Latitude and Longitude are required to enable us calculate distance between two points
```graphql endpoint doc
mutation {
  createApartment(city: "Lisbon", country: "Portugal", rooms: 5, latitude: 6.590507, longitude: 3.362841) {
    message
    data {
      id
      city
      country
      latitude
      longitude
      creatorId
    }
  }
}

```
    MarkApartmentAsFavorite - markApartmentAsFavorite mutation takes in the apartmentId as argument and returns the Apartment details. apartmentId can be gotten from the query getApartments
```graphql endpoint doc
mutation{
  markApartmentAsFavorite(apartmentId: 7)
}
```
    SearchForApartments - this mutation takes in arguments, including substrings like city, countries. Where location is passed as argument, current searchers coordinates(latitude & longitude) are required to calculate the distance in Kilometers. This mutation returns an array of Apartments 
```graphql endpoint doc
mutation{
  searchForApartments(city: "lisb", country:"portu", rroms:5, latitude: 12.084589, longitude: 8.871791, distance: 900){
    	id,
    city,
    country,
    rooms
  }
}

```
### Queries
    GetApartments - the get apartments query returns an array of apartments
```graphql endpoint doc
query{
  getApartments{
    id,
    city,
    country,
    rooms,
    latitude,
    longitude
  }
}
```
    GetFavoriteApartments - the get favorites apartment returns the favorited apartments by the logged in user
```graphql endpoint doc
query{
  getFavoriteApartments{
    id,
    city,
    country,
    rooms,
    latitude,
    longitude
  }
}
```


# For Tests
use "npm run test" command

The test focuses only on sanitizing and validating the graphql resolver inputs.

# Enhanced Entity Relationship DIAGRAM

![EER Diagram](eer/eer-diagram-homelike.png?raw=true)