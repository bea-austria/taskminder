import Login from './Login'
import Header from './Header'
import UserContext from '../../utils/userContext';
import { useContext } from 'react';

function Landing(){
    const {message} = useContext(UserContext);
    return(
        <>
        <Header/>
        <main className='grid grid-cols-2 bg-indigo-500'>
            <div className='p-12'>
                <h1 className='text-5xl mb-6 text-white'>Effortlessly manage your team</h1>
                <p className='text-xl text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique ducimus labore repellendus eum. Dignissimos harum corrupti nam veritatis numquam, fugiat maxime expedita quo voluptatem placeat repudiandae quam saepe assumenda.</p>
                <button className="bg-indigo-50 text-lg hover:bg-indigo-100 text-indigo-600 font-bold mt-10 py-4 px-6 rounded border border-gray-300">
                    Learn about TaskMinder
                </button>
            </div>
            <div className='p-12 w-5/6'>
                <div className="p-4 mb-2 text-sm border border-red-300 font-medium bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {message}
                </div>
                <Login/>
            </div>
        </main>
        </>
    )
}

export default Landing;