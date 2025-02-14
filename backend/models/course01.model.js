// models/Course01.model.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    price: { type: Number, required: true },
    // authorname : {type: String, required: true},
    // category : {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
