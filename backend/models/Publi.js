const { Schema } = require('mongoose');
const {mongoose} = require('../db/db');

const Publi = mongoose.model('Publi', new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Array },
    comments: { type: Array },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userImage: { type: String },
}, {
    timestamps: true
}))

module.exports = Publi;