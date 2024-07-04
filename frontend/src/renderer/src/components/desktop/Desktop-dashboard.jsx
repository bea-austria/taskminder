import UserContext from '../../../../../utils/userContext.js';
import { useContext, useState } from 'react';

function DesktopDashboard(){
    const {
        projects, 
        startTracker, 
        pauseTracker, 
        trackerBtns,
        timer,
        weeklyHours,
        activityLevel,
        setTrackerBtns,
        handleSignOut,
        errorMsg,
        setErrorMsg} = useContext(UserContext);
    const [toolTips, setToolTips] = useState(Array(projects.length).fill(false));
    const [activeProjectIndex, setActiveProjectIndex] = useState(null)
    
    //Shows and hides tracker tooltip
    function handleMouseEnter(index){
        const currentToolTips = [...toolTips];
        currentToolTips[index] = true;
        setToolTips(currentToolTips);
    }

    //Handles disappearance of tooltip
    function handleMouseLeave(index){
        const currentToolTips = [...toolTips];
        currentToolTips[index] = false;
        setToolTips(currentToolTips);
    }

    //Starts or pause tracker for a specific project
    function handleTracking(project, index){
        let currentTracker = [...trackerBtns];

        if(activeProjectIndex !== null && activeProjectIndex !== index){ 
            setErrorMsg('Please pause active timer')
            return
        }
    
        if(trackerBtns[index] === 'start'){
            currentTracker[index] = 'pause';
            startTracker(project);
            setActiveProjectIndex(index);
        }else{
            currentTracker[index] = 'start';
            pauseTracker(project);
            setActiveProjectIndex(null);
        }
        setTrackerBtns(currentTracker);
    }

    setTimeout(() => setErrorMsg(null), 5000)

    return(
        <div className='flex flex-col'>
            <div className='bg-blue-900 p-6 w-full flex flex-col'>
                <span className="material-symbols-outlined text-white ml-auto cursor-pointer" onClick={handleSignOut}>
                logout
                </span>

                {errorMsg && (
                <div className="absolute z-50 top-50 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <span className="material-symbols-outlined flex-shrink-0 inline me-3">
                info
                </span>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Error!</span> {errorMsg}.
                </div>
                </div>
                )}

                <div className='flex justify-center items-center gap-2'>
                    <div className="text-white rounded-lg dark:bg-blue-900 dark:text-green-200">
                        <span className="material-symbols-outlined text-4xl">
                        timer
                        </span>
                        <span className="sr-only">Timer icon</span>
                    </div>
                    <p className="text-2xl font-normal text-white">
                    {timer ? `${timer.hours}:${timer.minutes}:${timer.seconds}` :  "00:00:00"}
                    </p>
                </div>
                <div className='flex justify-between border-customLightBlue'>
                    <p className='text-white px-8'>Activity Level: {activityLevel}%</p>
                    <p className='text-white px-8'>Weekly Total: {weeklyHours ? weeklyHours : "00:00:00"}</p>
                </div>
            </div>

            <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:gap-y-6">
                {projects.length > 0 ?
                projects.map((project, index)=> (
                    <div key={index} className={`relative flex w-full justify-between items-center p-5 lg:mb-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700` }>
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
                        <div className="flex justify-between items-center">
                            <p className='text-lg'>{project.worked_hours ? project.worked_hours : '00:00:00'}</p>
                            <a href="#" className={`mx-3 px-2 py-1 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900 ${activeProjectIndex !== null && activeProjectIndex !== index ? 'focus:ring-red-400' : 'focus:ring-blue-300'}` } onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={()=>handleMouseLeave(index)} onClick={() => {handleTracking(project, index)}}>
                                <span className="rtl:rotate-180 flex justify-center items-center material-symbols-outlined text-3xl" aria-hidden="true">
                                {trackerBtns[index] === 'start' ? 'play_arrow' : 'pause'}
                                </span>
                            </a>
                            { toolTips[index] &&
                            <div className="absolute z-10 right-[12px] bottom-3/4 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                            <div className="text-gray-900 text-sm font-medium">{trackerBtns[index] === 'start' ? 'Start Tracker' : 'Pause Tracker'}</div>
                            <div className="tooltip-arrow"></div>
                            </div>
                            }
                        </div>
                    </div>
                ))
                : 
                <p className='text-blue-900 text-base text-center mt-5'>You have no active projects. <a href="https://taskminder-app.vercel.app/" target='_blank' className='underline font-semibold'>Start a new project.</a></p>
                }
            </div>
        </div>
    )
}

export default DesktopDashboard;