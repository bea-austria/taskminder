import './App.css'
import { Routes, Route, useNavigate, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Landing from './components/website-landing/Web-landing';
import DesktopLanding from './components/desktop/Desktop-landing';
import DesktopDashboard from './components/desktop/Desktop-dashboard';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import NotFound from './components/404';
import UserContext from '../../../utils/userContext';
import activityCalculator from '../../../utils/getActivity';
import isElectron from 'is-electron';

const URL = 'https://taskminder-app-api-git-main-bea-austrias-projects.vercel.app'
const socket = io.connect(URL);

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
  const [dropDown, setDropDown] = useState(false);
  const [screenShots, setScreenShots] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'https://taskminder-app-api-git-main-bea-austrias-projects.vercel.app';

  //Shows and hide profile dropdown
  function showDropDown(){
    setDropDown(!dropDown);
  }

  //Verifies token for password reset page
  useEffect(()=>{
    const verify = async() => {
      const token = searchParams.get('token');
      if(token){
        const response = await verifyToken(token);
        setIsTokenValid(response);
      }else{
        setIsTokenValid(false);
      }
    };
    verify();
  }, [searchParams]);

  //Communicates with the backend to verify token validity
  const verifyToken = async(token) => {
    try{
      const response = await axios.post(`api/verifyToken`, {token: token})
      if(response.status == 200) return true
    }catch(error){
      setErrorMsg(error.response.data)
      return false;
    }
  };

  //Handles user authentication upon page refresh
  useEffect(() => {
    const checkLoggedIn = async() => {
      try{
        const response = await axios.get(`/api/isAuthenticated`);
        if(response.data.user !== null){
          setUser(response.data.user)
          setIsLogged(true);
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
      const response = await axios.post(`/api/addUser`, userInfo);
      setSuccessMsg(response.data.message);
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  };

  //Fetches user information on log in
  const handleLogIn = async (userInfo) => {
    try {
      const response = await axios.post(`/api/logUser`, userInfo);
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
      await axios.get(`/api/logOff`);
      socket.emit('pause');
      setDropDown(false);
      setIsLogged(false);
    }
    catch(error){
      console.error(error);
    }
  };

  //Request backend to send email for password reset
  const handleEmailVerification = async(email) =>{
    try{
      const response = await axios.post(`api/forgotPassword`, email);
      setSuccessMsg(response.data.message);
    }catch(error){
      if(error && error.response.data.error){
        setErrorMsg(error.response.data.error);
      }else{
        setErrorMsg('An error occurred while processing your request.');
      }
    }
  }

  //Sets new password for a user
  const handlePWReset = async(data) => {
    try{
      const response = await axios.post('/api/resetPassword/', data);
      setSuccessMsg(response.data.message);
    }catch(error){
      if(error && error.response.data.error){
        setErrorMsg(error.response.data.error);
      }else{
        setErrorMsg('An error occurred while processing your request.');
      }
    }
  }

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
      if(error && error.response.data.error){
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
      await axios.post(`/api/newProject`, project);
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
  const startTracker = (project) => {
    getActivity();
    const newCalculator = activityCalculator(activityLevel);
    setCalculator(newCalculator);

    socket.emit('start', {project, user});
    socket.on('userTimer', (data) => {
      setTimer(data);
    });

    window.electron.screenshotMsg(()=>{
      getScreenShots();
    });
    window.electron.startCapture(project.name);
    window.electron.uploadScreenShot((data)=>{
      uploadScreenShot(project, data)
    })
  }

  //Saves tracked time and activity level
  const pauseTracker = (project) => {
    window.electron.stopCapture(project.name);
    socket.emit('pause');
    fetchProjects();
    getWeeklyHours();
    scheduleReport();
    
    const actLevelOnPause = calculator.getActivity()
    setActivityLevel(actLevelOnPause);
    saveActivityLevel(actLevelOnPause);
    calculator.stopTimer();
    setCalculator(null);
  }

  //Schedule a report when the user stops the tracker
  const scheduleReport = async() => {
    try{
      await axios.get(`/api/scheduleReport/${user.id}`);
    }catch(error){
      console.error(error)
    }
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
    if(isLogged && user.id){
      getWeeklyData();
      getWeeklyHours();
      getScreenShots();
      getActivity();
      getTeamMembers();
    }
  }, [isLogged, user])

  //Retrieve all available data on productivity and activity for the current week
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

  //Uploads screenshot everytime one is taken
  const uploadScreenShot = async(project, data)=> {
    try{
      await axios.post(`/api/uploadScreenshot/${user.id}`, data); 
    }catch(error){
      console.error(error);
    }
  }
  const getScreenShots = async() =>{
    try{
      const response = await axios.get(`/api/getScreenShots/${user.id}`);
      setScreenShots(response.data)
    }catch(error){
      console.error(error);
    }
  }
  //Retrieves activity level from the database
  const getActivity = async() =>{
    try{
      const response = await axios.get(`/api/getActivity/${user.id}`);
      const activity = response.data.activity;
      setActivityLevel(activity);
    }catch(error){
      console.error(error);
    }
  };

  //Automatically updates activity level shown on user's feed every 5 minutes
  useEffect(()=>{
    let activity;
    let timer;

    if(calculator){
      timer = setInterval(()=>{
        activity = calculator.getActivity();
        setActivityLevel(activity);
        saveActivityLevel(activity);
      }, 300000)
    };

    return (() => clearInterval(timer))
  }, [calculator]);

  //Saves activity level in the database
  const saveActivityLevel = async(activity) => {
    try{
      const data = {
        id: user.id,
        activity: activity
      };
      await axios.post(`/api/setActivity`, data);
    }catch(error){
      console.error(error);
    }
  }

  //Retrieves team members
  const getTeamMembers = async() => {
    try{
      const response = await axios.get(`/api/getMembers`);
      setTeamMembers(response.data);
    }catch(error){
      console.error(error)
    }
  };
  
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
    setTrackerBtns,
    timer,
    weeklyHours,
    activityLevel, 
    weeklyData,
    dropDown,
    setDropDown,
    showDropDown,
    screenShots,
    URL,
    teamMembers,
    handleEmailVerification,
    handlePWReset,
    isTokenValid
  };
  return(
    <UserContext.Provider value={contextValue}>
      <Routes>
        {isElectron() ? 
        <>
        <Route 
        path='/' 
        element={isLogged ? <Navigate to='/dashboard/' /> : <DesktopLanding/>}
        />
        <Route
          path='/dashboard/'
          element={isLogged ? <DesktopDashboard /> : <Navigate to='/' />}
        />
        </>
        : 
        <>
        <Route 
          path='/reset-password' 
          element={<ResetPassword/>}
        />
        <Route
          exact 
          path='/' 
          element={isLogged ? <Navigate to='/dashboard/' /> : <Landing/>}
        />
        <Route
          path='/dashboard/*'
          element={isLogged ? <Dashboard /> : <Navigate to='/' />}
        />
        <Route path="*" element={<NotFound page="Homepage" link="https://taskminder-app.vercel.app/"/>} />
        </>
        }
      </Routes>
    </UserContext.Provider>
  )
}

export default App
