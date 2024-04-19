import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);

  const handleRegistration = async () => {
    try {
      await axios.post('/api/addUser');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogIn = async () => {
    try {
      await axios.post('/api/logUser');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing onLog={handleLogIn} onRegister={handleRegistration}/>}/>
        <Route path='/dashboard/*' element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App
