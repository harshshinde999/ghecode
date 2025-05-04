const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    WAD_Marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    CC_Marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    DSBDA_Marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    CNS_Marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    AI_marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema); 