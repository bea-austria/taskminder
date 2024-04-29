import Login from './Login'
import Header from './Header'
import UserContext from '../../utils/userContext';
import { useContext } from 'react';

function Landing(){
    const {successMsg, errorMsg, setSuccessMsg, setErrorMsg} = useContext(UserContext);

    setTimeout(() => setErrorMsg(''), 3000)
    setTimeout(() => setSuccessMsg(''), 3000)
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
            {errorMsg && (
                <div className="flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <span className="material-symbols-outlined flex-shrink-0 inline me-3">
                info
                </span>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Error!</span> {errorMsg}.
                </div>
                </div>
            )}

            {successMsg && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <span className="material-symbols-outlined flex-shrink-0 inline me-3">
                info
                </span>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Success!</span> {successMsg}.
                </div>
              </div>
            )}

                <Login/>
            </div>
        </main>
        </>
    )
}

export default Landing;