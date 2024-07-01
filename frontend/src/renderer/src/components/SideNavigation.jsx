import logo from "../assets/logo/taskminderlogo.svg";
import { sideBarOptions } from "../../src/const/navLinks";
import { Link } from "react-router-dom";
import { useState } from "react";

function SideBar(){
   const [showSideBar, setShowSideBar] = useState(false);
   const [activeLinkIndex, setActiveLinkIndex] = useState(0);
   return(
        <aside>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={()=>{setShowSideBar(!showSideBar)}}>
               <span className="sr-only">Open sidebar</span>
               <span className="material-symbols-outlined" aria-hidden="true">
               menu
               </span>
            </button>

            <div id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${showSideBar ? 'translate-x-0' : ''}`} aria-label="Sidebar">      
               {!showSideBar &&
               <div className="bg-gray-50">
                  <a href="#" className="-m-1.5 flex gap-3 p-5">
                     <span className="sr-only">TaskMinder</span>
                     <img className="h-10 w-auto" src={logo} alt="TaskMinder logo" />
                     <span className="text-2xl">TaskMinder</span>
                  </a>
               </div>}
               
               <div className="relative h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  {showSideBar &&
                  <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="absolute right-3 top-4 inline-flex items-center text-base text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={()=>{setShowSideBar(!showSideBar)}}>
                     <span className="sr-only">Open sidebar</span>
                     <span className="material-symbols-outlined" aria-hidden="true">
                     arrow_forward_ios
                     </span>
                  </button>
                  }
                  <ul className="space-y-2 font-medium">
                     {sideBarOptions.map((option, index) => (
                     <li key={index} onClick={()=>setActiveLinkIndex(index)}>
                        <Link to={option.path} className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeLinkIndex === index ? 'text-blue-900' : ' text-gray-900'}`}>
                           <span className="material-symbols-outlined w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                           {option.icon}
                           </span>
                           <span className="ms-3">{option.label}</span>
                        </Link>
                     </li>
                     ))}
                  </ul>
               </div>
            </div>
        </aside>
   )
}

export default SideBar;