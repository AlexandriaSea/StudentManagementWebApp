/*
Name: Wenjie Zhou
Student ID: 301337168
Date: 2024-03-05
*/

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes for CRUD
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudentById);
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;