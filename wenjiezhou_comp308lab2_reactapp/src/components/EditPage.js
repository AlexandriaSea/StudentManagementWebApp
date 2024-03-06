/*
Name: Wenjie Zhou
Student ID: 301337168
Date: 2024-03-05
*/

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditPage = () => {
  // Get student ID from URL param
  const { id } = useParams();

  // Get student data based on the student ID and populate the input fields with the data
  useEffect(() => {
    const fetchStudentById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/students/${id}`);
        const studentData = response.data;
        document.getElementById('studentNumber').value = studentData.studentNumber;
        document.getElementById('firstName').value = studentData.firstName;
        document.getElementById('lastName').value = studentData.lastName;
        document.getElementById('address').value = studentData.address;
        document.getElementById('city').value = studentData.city;
        document.getElementById('phoneNumber').value = studentData.phoneNumber;
        document.getElementById('email').value = studentData.email;
        document.getElementById('program').value = studentData.program;
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudentById();
  }, [id]);


  // Update a student with data retrieved from the input fields
  const updateStudent = async () => {
    try {
      const updatedStudent = {
        studentNumber: document.getElementById('studentNumber').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        program: document.getElementById('program').value
      };

      await axios.put(`http://localhost:4000/api/students/${id}`, updatedStudent);

    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Render
  return (
    <div className="container" style={{ backgroundColor: 'PeachPuff', padding: '100px', borderRadius: '250px' }}>
      <h2>Edit and Update Student</h2>
      <form onSubmit={updateStudent}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
          <label>Student Number:</label>
          <input type="text" id="studentNumber" name="studentNumber" className="form-control form-control-sm" required />
          <label>First Name:</label>
          <input type="text" id="firstName" name="firstName" className="form-control form-control-sm" required />
          <label>Last Name:</label>
          <input type="text" id="lastName" name="lastName" className="form-control form-control-sm" required />
          <label>Address:</label>
          <input type="text" id="address" name="address" className="form-control form-control-sm" required />
          <label>City:</label>
          <input type="text" id="city" name="city" className="form-control form-control-sm" required />
          <label>Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" className="form-control form-control-sm" required />
          <label>Email:</label>
          <input type="email" id="email" name="email" className="form-control form-control-sm" required />
          <label>Program:</label>
          <input type="text" id="program" name="program" className="form-control form-control-sm" required />
          <button type="submit" className='btn btn-primary btn-sm'>Update</button>
          <Link type='button' className='btn btn-secondary btn-sm' to="/">Back to Homepage</Link>
        </div>
      </form>
    </div>
  );
};

export default EditPage;