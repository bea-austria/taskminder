import Summary from "./Summary.jsx"
import SideBar from "./SideNavigation.jsx"
import Timesheet from "./Timesheet.jsx"
import {Routes, Route, Link } from 'react-router-dom';
import Settings from "./Settings.jsx";
import Help from "./Help.jsx";
import Teams from "./Teams.jsx";
import Projects from "./Projects.jsx";
import Footer from "./Footer.jsx";
import DashOptions from './DashboardLinks.jsx'

function Dashboard(){
    return(
        <div className="flex flex-col min-h-screen h-full">
            <div className= "sm:flex flex-grow relative sm:static">
                <SideBar/>
                <ul className="flex gap-3 absolute right-5 top-3 sm:hidden">
                <DashOptions/>
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