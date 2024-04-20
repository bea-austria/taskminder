import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import UserContext from '../utils/userContext';

function App() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

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
      setIsLogged(true);
      setMessage(response.data.message);
      setTimeout(()=> {
        navigate('/dashboard/');
      }, 2000);
      
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const contextValue = {
    user,
    handleLogIn,
    handleRegistration,
    message
  };

  return (
    <UserContext.Provider value={contextValue}>
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route path='/dashboard/*' element={isLogged ? <Dashboard /> : <Landing message={'Please log in to your account.'}/>}/>
        </Routes>
    </UserContext.Provider>
  )
}

export default App
