import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import UserContext from '../utils/userContext';

const socket = io.connect('http://localhost:5000');

function App() {
  const [user, setUser] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [projects, setProjects] = useState([]);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation()

  //Checks if the user is logged in when page reloads
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

  //Adds user to the database
  const handleRegistration = async (userInfo) => {
    try {
      const response = await axios.post('/api/addUser', userInfo);
      setSuccessMsg(response.data.message);
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  };

  //Fetches user information on log in
  const handleLogIn = async (userInfo) => {
    try {
      const response = await axios.post('/api/logUser', userInfo);
      setUser(response.data.user);
      setSuccessMsg(response.data.message);
      setTimeout(()=> {
        setIsLogged(true);
      }, 2000);
      
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  };

  //Requests to destroy user session on sign out
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
  };

  //Fetches saved projects when page reloads
  useEffect(()=>{
    if(isLogged) fetchProjects() 
  }, [isLogged]);

  //Fetches saved projects
  const fetchProjects = async() =>{
    try{
        const response = await axios.get(`/api/getProjects/${user.id}`)
        if(response.data !==null){
          setProjects(response.data.projects);
      }
    }catch(error){
      if(error.response.data.error){
        setErrorMsg(error.response.data.error);
      }else{
        setErrorMsg('An error occurred while processing your request.');
      }
    }
  };

  //Passes new project information to the backend
  const handleNewProject = async (project) =>{
    try{
      await axios.post('/api/newProject', project);
      fetchProjects();
      setSuccessMsg('Project successfully added');
    }catch(error){
      if(error.response.data.error){
        setErrorMsg(error.response.data.error);
      }else{
        setErrorMsg('An error occurred while processing your request.');
      }
    }
  }

  //Passes project to be deleted to the backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteProject/${id}`);
      fetchProjects();
    }catch (error) {
      console.error('Error:', error);
    }
  }

  const startTracker = (project) => {
    socket.emit('start', project);
    socket.on('timer', (data) => {
      setTimer(data);
    });
  }

  const pauseTracker = () => {
    socket.emit('pause');
  }

  const handleEdit = async(project, user) => {
    try{
      await axios.post(`/api/editProject`, project);
      fetchProjects();
    }catch (error) {
      if(error.response.data.error){
        setErrorMsg(error.response.data.error);
      }else{
        setErrorMsg('An error occurred while processing your request.');
      }
    }
  }

  const contextValue = {
    user,
    handleLogIn,
    handleRegistration,
    errorMsg,
    successMsg,
    setSuccessMsg,
    setErrorMsg,
    handleSignOut,
    handleNewProject,
    projects,
    handleDelete,
    handleEdit,
    startTracker,
    pauseTracker,
    timer
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
