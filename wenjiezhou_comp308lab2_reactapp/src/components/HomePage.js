/*
Name: Wenjie Zhou
Student ID: 301337168
Date: 2024-03-05
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {

  // Create state variables
  const [students, setStudents] = useState([]);
  const [searchedStudent, setSearchedStudent] = useState(null);

  // Get all students from the database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  // Add a student
  const addStudent = async (event) => {
    event.preventDefault();

    // Get student data from the form input fields
    try {
      const formData = {
        studentNumber: event.target.studentNumber.value,
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        address: event.target.address.value,
        city: event.target.city.value,
        phoneNumber: event.target.phoneNumber.value,
        email: event.target.email.value,
        program: event.target.program.value
      };

      // Send a POST request to add the student
      const response = await axios.post('http://localhost:4000/api/students', formData);

      // Update the students state with the new student data (Client Side)
      setStudents([...students, response.data]);

      // Clear the form input fields
      event.target.reset();

    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Search a student by ID
  const searchStudentById = async (event) => {
    event.preventDefault();

    try {
      // Get the student ID from input field
      const id = event.target.id.value;

      // Send a GET request to search for the student by ID
      const response = await axios.get(`http://localhost:4000/api/students/${id}`);

      // Update the searchedStudent state with the found student data
      setSearchedStudent(response.data);

    } catch (error) {
      console.error('Error searching student:', error);
    }
  };

  // Clear the displayed results for the found student by setting state to null
  const resetSearch = () => {
    setSearchedStudent(null);
  };

  // Delete a student by ID
  const deleteStudentById = async (id) => {
    // Display a popup window to ask the user for confirmation to delete
    const confirmDelete = window.confirm(`You are about to delete the selected student \nRecord ID: ${id} \nAre you sure?`);

    // Return if user cancels delete action
    if (!confirmDelete) {
      return;
    }

    // Continue with the deletion of the student if the user confirms the delete action
    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`);

      // Update the students state by filtering out the deleted student (Client Side)
      setStudents(students.filter(student => student._id !== id));

    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Render
  return (
    <div className="container" style={{ backgroundColor: 'lightblue', padding: '100px', borderRadius: '250px' }}>
      <div>
        <h2>List of All Students</h2>
        <table className='table table-light table-striped'>
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Student Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Program</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.studentNumber}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.address}</td>
                <td>{student.city}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{student.program}</td>
                <td>
                  <Link type="button" class="btn btn-success btn-sm w-100" to={`/edit/${student._id}`}>Edit</Link>
                  <button type="button" className='btn btn-danger btn-sm w-100' onClick={() => deleteStudentById(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />

      <div>
        <h2>Add New Student</h2>
        <form onSubmit={addStudent}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
            <input type="text" name='studentNumber' id='studentNumber' className="form-control form-control-sm" placeholder="Student Number" required />
            <input type="text" name='firstName' id='firstName' className="form-control form-control-sm" placeholder="First Name" required />
            <input type="text" name='lastName' id='lastName' className="form-control form-control-sm" placeholder="Last Name" required />
            <input type="text" name='address' id='address' className="form-control form-control-sm" placeholder="Address" required />
            <input type="text" name='city' id='city' className="form-control form-control-sm" placeholder="City" required />
            <input type="text" name='phoneNumber' id='phoneNumber' className="form-control form-control-sm" placeholder="Phone Number" required />
            <input type="email" name='email' id='email' className="form-control form-control-sm" placeholder="Email" required />
            <input type="text" name='program' id='program' className="form-control form-control-sm" placeholder="Program" required />
            <button type="submit" className='btn btn-primary btn-sm'>Add Student</button>
            <button type="reset" className='btn btn-secondary btn-sm'>Reset</button>
          </div>
        </form>
      </div>
      <br />

      <div>
        <h2>Search Existing Student</h2>
        <form onSubmit={searchStudentById}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
            <input type="text" name='id' id='id' className="form-control form-control-sm" placeholder="Record ID" required />
            <button type="submit" className='btn btn-primary btn-sm'>Search Student</button>
            <button type="reset" className='btn btn-secondary btn-sm'>Reset</button>
            <button type="button" className='btn btn-warning btn-sm' onClick={resetSearch}>Clear Result</button>
          </div>
        </form>
        <br />
        {searchedStudent && (
          <div>
            <p>Student Number: {searchedStudent.studentNumber}</p>
            <p>First Name: {searchedStudent.firstName}</p>
            <p>Last Name: {searchedStudent.lastName}</p>
            <p>Address: {searchedStudent.address}</p>
            <p>City: {searchedStudent.city}</p>
            <p>Phone Number: {searchedStudent.phoneNumber}</p>
            <p>Email: {searchedStudent.email}</p>
            <p>Program: {searchedStudent.program}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;