import Profile from '../assets/logo/bunny-icon.jpg';
import Placeholder from '../assets/placeholder.jpg';
import UserContext from '../../utils/userContext.js';
import { useContext } from 'react';
import PageHeader from './PageHeader.jsx';


function Summary(){
    const {user} = useContext(UserContext);
    
    return(
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <PageHeader h1={'Dashboard'}/>            

            <section className="grid grid-cols-3 gap-4 my-8">
                <div className="flex items-center justify-center gap-3 rounded bg-gray-50 dark:bg-gray-800 py-6">
                    <img src={Profile} alt="Profile picture" className='rounded-full h-20 w-20'/>
                    <div>
                        <h2 className='text-2xl'>{user.first_name.charAt(0).toUpperCase()+ user.first_name.slice(1) + ' ' + user.last_name.charAt(0).toUpperCase()+ user.last_name.slice(1)}</h2>
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
            
            <section className="grid grid-cols-3 gap-4 my-8">
                <div className="flex flex-col justify-start col-span-2">
                    <h2 className="text-2xl mb-4">
                    Projects:
                    </h2>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Project Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Hours Worked
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        SEO Research
                                    </th>
                                    <td className="px-6 py-4 flex justify-start gap-5 items-center">
                                        16:25:09
                                        <div className="w-2/5 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '45%' }}> 45%</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Coding
                                    </th>
                                    <td className="px-6 py-4 flex justify-start gap-5 items-center">
                                        23:23:01
                                        <div className="w-2/5 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '45%' }}> 45%</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Product Design
                                    </th>
                                    <td className="px-6 py-4 flex justify-start gap-5 items-center">
                                        03:25:09
                                        <div className="w-2/5 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '45%' }}> 45%</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-col justify-start">
                    <h2 className="text-2xl mb-4">
                    Productivity:
                    </h2>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        Insert chart here
                    </p>
                </div>
                </div>
            
            </section>
            
            <section className="flex flex-col justify-start">
                <h2 className="text-2xl mb-4">
                    Recent Activities:
                </h2>
                <div className="grid grid-cols-6 h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 gap-4">
                    <div className='flex flex-col justify-start items-center col-span-1'>
                        <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={Placeholder} alt="image description"/>
                        <span>05:06 pm</span>
                    </div>
                    <div className='flex flex-col justify-start items-center col-span-1'>
                        <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={Placeholder} alt="image description"/>
                        <span>05:06 pm</span>
                    </div>
                    <div className='flex flex-col justify-start items-center col-span-1'>
                        <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={Placeholder} alt="image description"/>
                        <span>05:06 pm</span>
                    </div>
                    <div className='flex flex-col justify-start items-center col-span-1'>
                        <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={Placeholder} alt="image description"/>
                        <span>05:06 pm</span>
                    </div>
                    <div className='flex flex-col justify-start items-center col-span-1'>
                        <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={Placeholder} alt="image description"/>
                        <span>05:06 pm</span>
                    </div>
                    <div className='flex flex-col justify-start items-center col-span-1'>
                        <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={Placeholder} alt="image description"/>
                        <span>05:06 pm</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Summary;