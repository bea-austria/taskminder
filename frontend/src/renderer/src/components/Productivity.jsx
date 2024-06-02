import React, { useState, useEffect } from 'react';
import UserContext from '../../utils/userContext.js';
import { useContext } from 'react';

function ActivityLevels() {
  const {activityLevel, saveActivityLevel} = useContext(UserContext);
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [inactiveSeconds, setInactiveSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    function handleMovement() {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1000); // Reset to inactive after 1 second
    }

    // Add event listeners for detecting user activity
    document.addEventListener('keydown', handleMovement);
    document.addEventListener('click', handleMovement);
    document.addEventListener('mousemove', handleMovement);
    document.addEventListener('scroll', handleMovement);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('keydown', handleMovement);
      document.removeEventListener('click', handleMovement);
      document.removeEventListener('mousemove', handleMovement);
      document.removeEventListener('scroll', handleMovement);
    };
  }, []);

  useEffect(()=> {
    const timer = setInterval(()=>{
      if(isActive){
        setActiveSeconds(prevState => prevState + 1);
      }else{
        setInactiveSeconds(prevState => prevState + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  useEffect(() => {
    const activityCalculator = setInterval(() => {
      const calculatedActivityLevel =   Math.round((activeSeconds / (activeSeconds + inactiveSeconds)) * 100);
      saveActivityLevel(calculatedActivityLevel);
    }, 5000);
  
    return () => {
      clearInterval(activityCalculator);
    };
  }, [activeSeconds, inactiveSeconds]);
  
  

  return(
    <div className="flex flex-col items-center justify-center rounded bg-gray-50 dark:bg-gray-800 py-6">
      <div className='flex'>
          <span className="material-symbols-outlined text-2xl">
          trackpad_input
          </span>
          <h3 className='text-xl'>Activity level:</h3>
      </div>
      <p className='text-3xl'>{activityLevel}%</p>
    </div>
  )
}

export default ActivityLevels;