const { Schema } = require("mongoose");
const {mongoose} = require('../db/db');

const User = mongoose.model('User', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    description: { type: String },
    image: { type: String },
}))


module.exports = User;