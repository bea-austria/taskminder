import UserContext from '../../../../../utils/userContext.js';
import { useContext, useState } from 'react';

function DesktopDashboard(){
    const {
        user,
        projects, 
        startTracker, 
        pauseTracker, 
        trackerBtns,
        timer,
        weeklyHours,
        activityLevel,
        handleSignOut} = useContext(UserContext);
    const [toolTips, setToolTips] = useState(Array(projects.length).fill(false));
    const [project, setProject] = useState({})
    
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
    function handleTracking(e, project, index){
        e.stopPropagation();
        if(trackerBtns[index] === 'start'){
            startTracker(project, index);
        }else{
            pauseTracker(index);
        }
    }

    function handleProjectSelection(project){
        if(project.worked_hours === null){
            project.worked_hours = '00:00:00'
        }
        setProject(project)
    }
    
    return(
        <div className='flex flex-col'>
            <div className='bg-blue-900 p-6 w-full flex flex-col'>
                <span class="material-symbols-outlined text-white ml-auto cursor-pointer" onClick={handleSignOut}>
                logout
                </span>

                <div className='flex justify-center items-center gap-2'>
                    <div className="text-white rounded-lg dark:bg-blue-900 dark:text-green-200">
                        <span className="material-symbols-outlined text-4xl">
                        timer
                        </span>
                        <span className="sr-only">Timer icon</span>
                    </div>
                    <p className="text-2xl font-normal text-white">
                    {timer ? `${timer.hours}:${timer.minutes}:${timer.seconds}` : (project.worked_hours ? project.worked_hours : "0:00:00")}
                    </p>
                </div>
                <div className='flex justify-between border-customLightBlue'>
                    <p className='text-white px-8'>Activity Level: {activityLevel}%</p>
                    <p className='text-white px-8'>Weekly Total: {weeklyHours}</p>
                </div>
            </div>

            <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:gap-y-6">
                {projects.map((project, index)=> (
                    <div key={index} className="relative flex w-full justify-between items-center p-5 lg:mb-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={()=> handleProjectSelection(project)}>
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
                        <div className="flex justify-between items-center">
                            <p className='text-lg'>{project.worked_hours ? project.worked_hours : '00:00:00'}</p>
                            <a href="#" className="mx-3 px-2 py-1 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900" onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={()=>handleMouseLeave(index)} onClick={(e) => {handleTracking(e, project, index)}}>
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
                ))}
            </div>
        </div>
    )
}

export default DesktopDashboard;