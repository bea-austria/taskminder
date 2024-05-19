import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import UserContext from '../utils/userContext';
import activityCalculator from '../utils/getActivity';

const socket = io.connect('http://localhost:5000');

function App() {
  const [user, setUser] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [projects, setProjects] = useState([]);
  const [timer, setTimer] = useState(null);
  const [weeklyHours, setWeeklyHours] = useState('');
  const [trackerBtns, setTrackerBtns] = useState([]);
  const [activityLevel, setActivityLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const calculator = activityCalculator();

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
      activityCalculator();
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
      await axios.get('/api/logOff');
      setIsLogged(false);
      calculator.stopTimer()
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
          setProjects(response.data);
      }
    }catch(error){
      if(error.response.data.error){
        setErrorMsg(error.response.data.error);
      }else{
        setErrorMsg('An error occurred while processing your request.');
      }
    }
  };
  
  useEffect(() => {
    // Initialize trackerBtns after projects have been fetched
    setTrackerBtns(Array(projects.length).fill('start'));
  }, [projects]);

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
      setErrorMsg('An error occurred while processing your request.');
    }
  }

  const startTracker = (project, index) => {
    const currentTracker = [...trackerBtns];
    currentTracker[index] = 'pause';
    setTrackerBtns(currentTracker);

    socket.emit('start', {project, user});
    socket.on('userTimer', (data) => {
      setTimer(data);
    });
  }

  const pauseTracker = (index) => {
    const currentTracker = [...trackerBtns];
    currentTracker[index] = 'start';
    setTrackerBtns(currentTracker);

    socket.emit('pause');
    fetchProjects();
    getWeeklyHours();
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

  useEffect(()=>{
    if(user.id){
      getWeeklyHours();
    }
  }, [user]);

  const getWeeklyHours = async() => {
    try{
      const response = await axios.get(`/api/getWeeklyHours/${user.id}`);
      setWeeklyHours(response.data.worked_hours);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setInterval(()=>{
      const activity = calculator.getActivity();
      saveActivityLevel(activity);
    }, 5 * 60 * 1000);

    return (()=>{
      clearInterval(timer);
    })
  }, []);

  const saveActivityLevel = async(activity) => {
    try{
      console.log(activity)
    }catch(error){

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
    trackerBtns,
    timer,
    weeklyHours,
    activityLevel, 
    saveActivityLevel
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
