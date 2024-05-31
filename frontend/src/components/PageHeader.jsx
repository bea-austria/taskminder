import { useState, useContext } from "react";
import { dashOptions }  from "../const/navLinks.js";
import { Link } from "react-router-dom";
import DashOptions from "./DashboardLinks.jsx";

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function PageHeader({h1, handleModal}){
    const [showToolTip, setShowToolTip] = useState(false);


    const date = new Date();
    return(
        <section className="flex justify-between mb-10">
            <div className={h1 == 'Projects' ? 'relative' : ''}>
                <h1 className='text-3xl md:text-4xl font-bold mb-2'>{h1}</h1>
                <span className='text-base md:text-lg'>{formatDate(date)}</span>
                {h1 === 'Projects' && 
                <a href="#" className="absolute left-[120px] top-[4px] md:left-[140px] md:top-[7px]" onMouseEnter={()=>setShowToolTip(true)} onMouseLeave={()=>setShowToolTip(false)} onClick={handleModal}>
                    <span className="material-symbols-outlined text-3xl text-blue-700 cursor-pointer hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    add_circle
                    </span>
                </a>
                }
                { h1 === 'Projects' && showToolTip &&
                    <div className="absolute z-10 -right-[45px] -top-[20px] bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                    <div className="text-gray-900 text-sm font-medium">Add Project</div>
                    <div className="tooltip-arrow"></div>
                    </div>
                }
            </div>
            <ul className="hidden sm:flex xsm:gap-3">
                <DashOptions/>
            </ul>
        </section>
    )
};

export default PageHeader;