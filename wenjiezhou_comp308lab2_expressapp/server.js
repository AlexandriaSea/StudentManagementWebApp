/*
Name: Wenjie Zhou
Student ID: 301337168
Date: 2024-03-05
*/

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Enable body parser middleware
app.use(bodyParser.json());

// Enable CORS middleware
app.use(cors());

// MongoDB database connection
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/students', studentRoutes);

// Listening port
const PORT = 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));