/*
Name: Wenjie Zhou
Student ID: 301337168
Date: 2024-03-05
*/

const mongoose = require('mongoose')

// Student model
const studentSchema = new mongoose.Schema({
    studentNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    program: { type: String, required: true }
})

module.exports = mongoose.model('Student', studentSchema)