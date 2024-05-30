import image from '../assets/landing/taskminder-landing-about.jpg'
function About(){
    return(
        <section className="container px-6 py-10 mx-auto p-6 xsm:p-8 sm:p-12 md:p-10 lg:p-12" id='about'>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">About TaskMinder</h2>

            <div className="mt-2">
                <span className="inline-block w-40 h-1 bg-blue-900 rounded-full"></span>
                <span className="inline-block w-3 h-1 ml-1 bg-blue-900 rounded-full"></span>
                <span className="inline-block w-1 h-1 ml-1 bg-blue-900 rounded-full"></span>
            </div>

            <div className="mt-8 xl:mt-12 lg:flex lg:gap-2 lg:items-center">

                <div className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">
                    <div className="space-y-3">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-xl dark:text-white dark:bg-blue-500 material-symbols-outlined">
                        timer
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Time Tracking</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                        Detailed tracking of work hours throughout the day, including start time, end time, and total duration. Break duration tracking to monitor breaks taken by employees.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-xl dark:text-white dark:bg-blue-500 material-symbols-outlined">
                        trackpad_input
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Activity Levels</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                        Real-time indication of employee activity status, distinguishing between active (mouse movement or typing) and inactive (no activity) periods.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-xl dark:text-white dark:bg-blue-500 material-symbols-outlined">
                            screenshot_monitor
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Screenshot Capturing</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                        Scheduled screenshot capturing of the employee's screen at specified intervals or times during the workday. Screenshots are taken discreetly without disrupting the employee's workflow.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-xl dark:text-white dark:bg-blue-500 material-symbols-outlined">
                        summarize
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Daily Reporting</h1>

                        <p className="text-gray-500 dark:text-gray-300">
                        Seamless reporting of daily tasks accomplished by employees. Automatic compilation of daily reports including time records, attached screenshots, and task lists.
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
                    <img className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full" src={image} alt=""/>
                </div>

            </div>
        </section>
        );
    };

export default About;