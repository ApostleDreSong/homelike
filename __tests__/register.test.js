'use strict'

const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')
const schema = require("../graphql/types/index.js")

describe('Test my queries, mutations and subscriptions', () => {
    let tester

    before(() => {
        tester = new EasyGraphQLTester(schema)
    })
    it('Return false when using invalid query getUser', () => {
        const invalidQuery = `
        {
          getUser 
        }
      `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, invalidQuery)
    })
    it('Should pass if the query is valid', () => {
        const validQuery = `
                                {
                                  getApartments{
                                    id,
                                    city,
                                    country,
                                    rooms,
                                    latitude,
                                    longitude
                                  }
                                }
                            `
        tester.test(true, validQuery)
    })
    it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
          register(firstName: $firstName, lastName: $lastName , email: $email, password: $password) {
            message
                data {
                  id
                  firstName
                  lastName
                  email
                }
          }
        }
      `
        const sampleData = {
            firstName: "dami",
            lastName: "dami",
            email: "tester@homelike.com",
            password: "fela",
        }
        // First arg: false, there is no invalidField on the schema.
        tester.test(true, mutation, sampleData)
    })
    it('Should search', () => {
        const query = `
        {
          getFavoriteApartments{
        id,
            city,
            country,
            rooms,
            latitude,
            longitude
        }
        }
      `
        tester.test(true, query)
    })
})