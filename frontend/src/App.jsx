import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import UserContext from '../utils/userContext';

function App() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(()=>{
    const checkLoggedIn = async() => {
      try{
        const response = await axios.get('/api/checkLoggedIn');
        if(response.data.user !== null){
          setIsLogged(true);
          setUser(response.data.user)
          navigate(location.pathname)
        }else{
          setIsLogged(false);
        }
      }catch(error){
        console.error(error);
      }}
    checkLoggedIn();
  }, [])

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

  const handleSignOut = async () =>{
    try{
      const response  = await axios.get('/api/logOff');
      if (response){
        setIsLogged(false);
      }
    }
    catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchProjects() 
  }, []);

  const fetchProjects = async() =>{
    try{
      const response = await axios.get('/api/getProjects')
      if(response.data !==null){
        setProjects(response.data.projects);
      }
    }catch(error){
      console.error(error);
    }
  }

  const handleNewProject = async (project) =>{
    try{
      await axios.post('/api/newProject', project);
      fetchProjects()
    }catch(error){
      console.error(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteProject/${id}`);
      fetchProjects(); 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const contextValue = {
    user,
    handleLogIn,
    handleRegistration,
    message,
    handleSignOut,
    handleNewProject,
    projects,
    handleDelete
  };

  return (
    <UserContext.Provider value={contextValue}>
        <Routes>
          <Route 
            exact 
            path='/' 
            element={isLogged ? <Navigate to='/dashboard/' /> : <Landing/>}
            />
          <Route
            path='/dashboard/*'
            element={isLogged ? <Dashboard /> : <Navigate to='/' />}
          />
        </Routes>
    </UserContext.Provider>
  )
}

export default App
