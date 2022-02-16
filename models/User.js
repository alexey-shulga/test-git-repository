const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    registrationDate: {type: String, required: true},
    lastLoginDate: {type: String, required: true},
    userStatus: {type: Boolean, required: true}
});

module.exports = model('User', schema);