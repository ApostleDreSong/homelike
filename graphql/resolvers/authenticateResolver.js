const {Validator} = require("node-input-validator");
const {GraphQLError} = require('graphql');
const {User} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

module.exports = async (args) => {
    const {email, password} = args;
    let token = null;
    let user = {};

    // find user by email and compare passwords
    try {
        user = await User.findOne({where: {email: email}});
    } catch (e) {
        throw new Error(e);
    }
    if (user) {
        const {id, firstName, lastName, email} = user
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(isPasswordCorrect){
            try {
                token = jwt.sign({id, firstName, lastName, email}, process.env.PRIVATE_KEY,{
                    expiresIn: '1800000'
                });
            } catch (e) {
                throw new Error(e);
            }
        }else{
            throw new Error('Incorrect Password');
        }
    }else{
        throw new Error(`User with email:${email}  does not exist`);
    }

    return token
}