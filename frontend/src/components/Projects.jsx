import PageHeader from "./PageHeader";
import { useState } from "react";

function Projects(){
    const [showToolTip, setShowToolTip] = useState(false);
    return(
        <>
            <PageHeader h1={'Projects'}/>
            <div className="grid grid-cols-3">
                <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Technical SEO Research</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <div className="flex justify-between items-center">
                        <p>Target hours: 3:00:00</p>
                        <a href="#" className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onMouseEnter={()=>setShowToolTip(true)} onMouseLeave={()=>setShowToolTip(false)}>
                            <span className="rtl:rotate-180 flex justify-center items-center w-5 h-5 material-symbols-outlined text-4xl" aria-hidden="true">
                            play_arrow
                            </span>
                        </a>
                        { showToolTip &&
                        <div className="absolute z-10 -right-0.5 bottom-1/3 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                        <div className="text-gray-900 text-sm font-medium">Start Tracker</div>
                        <div className="tooltip-arrow"></div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Projects;