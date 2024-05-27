import Profile from '../assets/logo/bunny-icon.jpg';
import Placeholder from '../assets/placeholder.jpg';
import UserContext from '../../utils/userContext.js';
import { useContext, useEffect, useState } from 'react';
import PageHeader from './PageHeader.jsx';
import ApexCharts from 'react-apexcharts';
import options from '../../utils/chartData';

function Summary(){
    const {user, weeklyHours, projects, activityLevel, weeklyData} = useContext(UserContext);
    const [chartOptions, setChartOptions] = useState(options);
    
    useEffect(()=> {
        if(weeklyData){
            // Process fetched data
            const hoursData = chartOptions.series[0].data.map(dayData => {
                const matchingDailyData = weeklyData.find(dailyData => dailyData.day === dayData.x);
                if (matchingDailyData) {
                    const [hours, minutes, seconds] = matchingDailyData.total_hours.split(':');
                    const totalHours = parseInt(hours) + parseInt(minutes) / 60 + parseInt(seconds) / 3600;
                    return { x: dayData.x, y: totalHours.toFixed(2) };
                } else {
                    return { x: dayData.x, y: dayData.y }; // Keep the original value
                }
            });

            const activityData = chartOptions.series[1].data.map(dayData => {
                const matchingDailyData = weeklyData.find(dailyData => dailyData.day === dayData.x);
                return matchingDailyData ? { x: dayData.x, y: matchingDailyData.activity } : { x: dayData.x, y: dayData.y };
            });

            // Update the chart options and data
            const updatedOptions = {
                ...options,
                series: [
                    {
                        name: 'Hours',
                        data: hoursData
                    },
                    {
                        name: 'Activity',
                        data: activityData
                    }
                ]
            };

            setChartOptions(updatedOptions);
        };
    }, [weeklyData]);

    return(
        <>
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
                        <h3 className='text-xl'>Hours worked this week:</h3>
                    </div>
                    <p className='text-3xl'>{weeklyHours ? weeklyHours : '00:00:00'}</p>             
                </div>
                <div className="flex flex-col items-center justify-center rounded bg-gray-50 dark:bg-gray-800 py-6">
                <div className='flex'>
                    <span className="material-symbols-outlined text-2xl">
                    trackpad_input
                    </span>
                    <h3 className='text-xl'>Activity level:</h3>
                </div>
                <p className='text-3xl'>{activityLevel}%</p>
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
                                {projects.map((project, index)=>(
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {project.name}
                                    </th>
                                    <td className="px-6 py-4 flex justify-start gap-5 items-center">
                                        {project.worked_hours ? project.worked_hours : '00:00:00'}
                                        <div className="w-2/5 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '45%' }}> 45%</div>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-col justify-start">
                    <h2 className="text-2xl mb-4">
                    Productivity:
                    </h2>
                    <ApexCharts 
                        className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800"
                        options={chartOptions} 
                        series={chartOptions.series} 
                        type="bar" 
                        height={250} 
                    />
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
        </>
    )
}

export default Summary;