import Summary from "./Summary.jsx"
import SideBar from "./SideNavigation.jsx"
import Timesheet from "./Timesheet.jsx"
import {Routes, Route, Link } from 'react-router-dom';
import Settings from "./Settings.jsx";
import Help from "./Help.jsx";
import Teams from "./Teams.jsx";
import Projects from "./Projects.jsx";
import Footer from "./Footer.jsx";
import { useContext } from "react";
import { dashOptions } from "../const/navLinks.js";
import UserContext from "../../utils/userContext.js";

function Dashboard(){
    const {dropDown, showDropDown, handleSignOut} = useContext(UserContext);
    return(
        <div className="flex flex-col min-h-screen h-full">
            <div className= "sm:flex flex-grow relative sm:static">
                <SideBar/>
                <ul className="flex gap-3 absolute right-5 top-3 sm:hidden">
                {dashOptions.map((option, index)=>(
                    <li key={index} className={option.icon === 'account_circle' ? 'relative' : ''}> 
                        <Link to={option.path} onClick={option.icon === 'account_circle' ? showDropDown : undefined}>
                            <span className="material-symbols-outlined text-2xl cursor-pointer">
                                {option.icon}
                            </span>
                        </Link>
                        {option.icon === 'account_circle' && dropDown 
                        ? 
                        <div
                        id="dropdown"
                        className={`z-10 ${dropDown ? '' : 'hidden'} absolute right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link to='/dashboard' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Settings
                                    </a>
                                </li>
                                <li onClick={handleSignOut}>
                                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        : ""
                        }
                    </li>
                ))}
                </ul>
                <main className="px-4 pt-4 pb-0 sm:ml-64 flex flex-grow">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full h-full">
                        <Routes>
                            <Route exact path='/' element={<Summary />}/>
                            <Route exact path='/timesheets' element={<Timesheet />}/>
                            <Route exact path='/setting' element={<Settings />}/>
                            <Route exact path='/help' element={<Help />}/>
                            <Route exact path='/teams' element={<Teams />}/>
                            <Route exact path='/projects' element={<Projects />}/>
                        </Routes>
                    </div>
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard