const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    film: {
        type: String,
        required: true
    },
    musicDirector: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        default: ''
    },
    actress: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Song', songSchema); 