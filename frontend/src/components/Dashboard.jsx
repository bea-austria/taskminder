import Summary from "./Summary.jsx"
import SideBar from "./SideNavigation.jsx"
import Timesheet from "./Timesheet.jsx"
import {Routes, Route } from 'react-router-dom';
import Settings from "./Settings.jsx";
import Help from "./Help.jsx";
import Teams from "./Teams.jsx";

function Dashboard(){
    return(
        <>
        <SideBar/>
        <main className="p-4 sm:ml-64 h-full">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-full">
                <Routes>
                    <Route exact path='/' element={<Summary />}/>
                    <Route exact path='/timesheets' element={<Timesheet />}/>
                    <Route exact path='/setting' element={<Settings />}/>
                    <Route exact path='/help' element={<Help />}/>
                    <Route exact path='/teams' element={<Teams />}/>
                </Routes>
            </div>
        </main>
        </>
    )
}

export default Dashboard