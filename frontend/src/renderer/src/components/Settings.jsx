import PageHeader from './PageHeader.jsx';
import { Link } from 'react-router-dom';
function Settings(){
    return(
        <>
            <PageHeader h1={'Settings'}/>
            <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
                <span className="material-symbols-outlined mx-auto mb-4 text-6xl text-gray-400" viewBox="0 0 512 512">
                construction
                </span>
                <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">Under Maintenance</h1>
                <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400 mb-5">Sorry, this page is currently unavailable</p>
                <Link to='/dashboard' className="font-semi-bold text-blue-900 md:text-lg xl:text-xl">View your dashboard</Link>
            </div>
            </section>
        </>
    )
}

export default Settings;