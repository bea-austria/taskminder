import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import UserContext from '../utils/userContext';

function App() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState('');
  const[isRegistered, setIsRegistered] = useState(true);

  function handleIsRegister(){
    setIsRegistered(!isRegistered);
  }

  const handleRegistration = async (userInfo) => {
    try {
      const response = await axios.post('/api/addUser', userInfo);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleLogIn = async (userInfo) => {
    try {
      const response = await axios.post('/api/logUser', userInfo);
      setUser(response.data.user);
      setMessage(response.data.message)
      console.log(response)
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const contextValue = {
    user,
    handleLogIn,
    handleRegistration,
    message,
    isRegistered,
    handleIsRegister
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/dashboard/*' element={<Dashboard />}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
