const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
        author: {
            type: String,
            required: true,
            default: 'Unauthenticated user'
        },
        email: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Message', messageSchema);