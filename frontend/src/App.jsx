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
  const [calculator, setCalculator] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
      await axios.get('/api/logOff');
      setIsLogged(false);
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

  //Allows user to start tracking time and activity level
  const startTracker = (project, index) => {
    const currentTracker = [...trackerBtns];
    currentTracker[index] = 'pause';
    setTrackerBtns(currentTracker);
    getActivity();

    socket.emit('start', {project, user});
    socket.on('userTimer', (data) => {
      setTimer(data);
    });
  }

  //Saves tracked time and activity level
  const pauseTracker = (index) => {
    const currentTracker = [...trackerBtns];
    currentTracker[index] = 'start';
    setTrackerBtns(currentTracker);

    socket.emit('pause');
    fetchProjects();
    getWeeklyHours();

    calculator.stopTimer();
    saveActivityLevel(activityLevel);
    setCalculator(null);
    }
  
  //Allows user to edit a project
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

  //Automatically updates weekly hours and fetches data summary for the chart
  useEffect(()=>{
    if(user.id){
      getWeeklyData();
      getWeeklyHours();
    }
  }, [isLogged])

  const getWeeklyData = async() => {
    try{
      const response = await axios.get(`/api/getWeeklyData/${user.id}`);
      setWeeklyData(response.data);
    }catch(error){
      console.error(error);
    }
  }

  //Retrieves weekly hours from the database
  const getWeeklyHours = async() => {
    try{
      const response = await axios.get(`/api/getWeeklyHours/${user.id}`);
      setWeeklyHours(response.data.worked_hours);
    }catch(error){
      console.error(error);
    }
  }

  //Retrieves activity level from the database
  const getActivity = async() =>{
    try{
      const response = await axios.get(`/api/getActivity/${user.id}`);
      setActivityLevel(response.data.activity);
      const newCalculator = activityCalculator(activityLevel);
      setCalculator(newCalculator);
    }catch(error){
      console.error(error);
    }
  }

  //Automatically updates activity level shown on user's feed every 5 minutes
  useEffect(()=>{
    let activity;
    let timer;

    if(calculator){
      timer = setInterval(()=>{
        activity = calculator.getActivity();
        setActivityLevel(activity)
      }, 300000)
    }

    return (() => clearInterval(timer))
  }, [calculator]);

  //Saves activity level in the database
  const saveActivityLevel = async(activity) => {
    try{
      const data = {
        id: user.id,
        activity: activity
      };
      await axios.post('/api/setActivity', data);
    }catch(error){
      console.error(error);
    }
  }

  //Context values to be consumed by other components
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
    weeklyData
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
