import logo from "../assets/logo/taskminderlogo.svg"

function SideBar(){
    return(
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <span className="material-symbols-outlined w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            menu
            </span>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
               <div className="bg-gray-50">
                  <a href="#" className="-m-1.5 flex gap-3 p-5">
                     <span className="sr-only">TaskMinder</span>
                     <img className="h-10 w-auto" src={logo} alt="TaskMinder logo" />
                     <span className="text-2xl">TaskMinder</span>
                  </a>
               </div>
               
               <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  <ul className="space-y-2 font-medium">
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="material-symbols-outlined w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                           team_dashboard
                           </span>
                           <span className="ms-3">Dashboard</span>
                        </a>
                     </li>
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 18 18">
                           task
                           </span>
                           <span className="flex-1 ms-3 whitespace-nowrap">Timesheets</span>
                        </a>
                     </li>
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           chart_data
                           </span>
                           <span className="flex-1 ms-3 whitespace-nowrap">Activity</span>
                        </a>
                     </li>
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           edit_square
                           </span>
                           <span className="flex-1 ms-3 whitespace-nowrap">Project Management</span>
                        </a>
                     </li>
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                           monetization_on
                           </span>
                           <span className="flex-1 ms-3 whitespace-nowrap">Finances</span>
                        </a>
                     </li>
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="material-symbols-outlined flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           groups
                           </span>
                           <span className="flex-1 ms-3 whitespace-nowrap">Team Members</span>
                        </a>
                     </li>
                  </ul>
               </div>
            </aside>
        </>
    )
}

export default SideBar;