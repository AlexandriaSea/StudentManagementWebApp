/*
Name: Wenjie Zhou
Student ID: 301337168
Date: 2024-03-05
*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import EditPage from './components/EditPage';

// Use React Router to navigate between different pages
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;