const {Validator} = require("node-input-validator");
const bcrypt = require("bcrypt");
const {User} = require('../../models').sequelize.models;
const SequelizeErrorParser = require('../../utilities/SequelizeErrorParser');

module.exports = async (args) => {
    const {firstName, lastName, email, password} = args;
    let hashedPassword = null;
    let user = {};

    // Validate and sanitize user inputs
    const v = new Validator({firstName, lastName, email, password}, {
        firstName: 'required',
        lastName: 'required',
        email: 'required|email',
        password: 'required'
    });
    const matched = await v.check();

    if (!matched) {
        let firstError = Object.entries(v.errors);
        throw new Error(`${firstError[0][0]}: ${firstError[0][1].message}`);
    }

    // Hash password input
    try {
        hashedPassword = await bcrypt.hash(password, parseInt(process.env.ROUNDS));
    } catch (e) {
        throw new Error(e)
    }

    // Create user row in db
    try{
        user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
    }catch (e) {
        const sqlError = SequelizeErrorParser(e);
        throw new Error(sqlError)
    }
    return {
        message: 'Registration successful',
        data: user
    };
}