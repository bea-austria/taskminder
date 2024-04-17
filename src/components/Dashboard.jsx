import Profile from '../assets/logo/bunny-icon.jpg'

function Dashboard(){
    return(
        <main className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <section className="flex justify-between mb-10">
                <div>
                    <h1 className='text-3xl font-bold mb-2'>Dashboard</h1>
                    <span className='text-lg'>Monday, April 15, 2024</span>
                </div>
                <div className="flex gap-3">
                <span className="material-symbols-outlined text-2xl">
                help
                </span>
                <span className="material-symbols-outlined text-2xl">
                settings
                </span>
                <span className="material-symbols-outlined text-2xl">
                account_circle
                </span>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center gap-3 rounded bg-gray-50 dark:bg-gray-800 py-6">
                    <img src={Profile} alt="Profile picture" className='rounded-full h-20 w-20'/>
                    <div>
                        <h2 className='text-2xl'>Bea A. Caponga</h2>
                        <p className='text-lg'>Job Position</p>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center rounded bg-gray-50 dark:bg-gray-800 py-6">
                    <div className='flex'>
                        <span className="material-symbols-outlined text-2xl">
                        schedule
                        </span>
                        <h3 className='text-xl'>Total hours worked:</h3>
                    </div>
                    <div className='flex gap-5'>
                        <div>
                            <p className='text-bs'>Today</p>
                            <p className='text-3xl'>06:30:05</p>
                        </div>
                        <div>
                            <p className='text-bs'>This Week</p>
                            <p className='text-3xl'>36:15:59</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded bg-gray-50 dark:bg-gray-800 py-6">
                    <div className='flex'>
                        <span className="material-symbols-outlined text-2xl">
                        trackpad_input
                        </span>
                        <h3 className='text-xl'>Activity level:</h3>
                    </div>
                    <p className='text-3xl'>78%</p>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center col-span-2 justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </p>
                </div>
            </section>
            <section className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
                </p>
            </section>
            </div>
        </main>
    )
}

export default Dashboard