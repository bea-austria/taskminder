import Summary from "./Summary.jsx"
import SideBar from "./SideNavigation.jsx"
import Timesheet from "./Timesheet.jsx"
import {Routes, Route } from 'react-router-dom';

function Dashboard(){
    return(
        <>
        <SideBar/>
        <main className="p-4 sm:ml-64">
        <Routes>
            <Route path='/' element={<Summary />}/>
            <Route path='/timesheets' element={<Timesheet />}/>
        </Routes>
        </main>
        </>
    )
}

export default Dashboard