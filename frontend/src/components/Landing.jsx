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
        <main className='md:grid md:grid-cols-2 bg-indigo-500 '>
            <div className='p-6 pb-0 xsm:p-8 xsm:pb-0 sm:p-12 sm:pb-0 md:p-10 lg:p-12'>
                <h1 className='text-3xl mb-3 text-white sm:text-4xl lg:text-5xl'>Effortlessly manage your team</h1>
                <p className='text-base text-white sm:text-lg lg:text-xl lg:my-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique ducimus labore repellendus eum. Dignissimos harum corrupti nam veritatis numquam, fugiat maxime expedita quo voluptatem placeat repudiandae quam saepe assumenda.</p>
                <button className="bg-indigo-50 text-base hover:bg-indigo-100 text-indigo-600 font-bold mt-4 py-2 px-3 lg:text-xl lg:py-4 lg:px-6 rounded border border-gray-300 sm:text-lg">
                    Learn about TaskMinder
                </button>
            </div>

            <div className='p-6 xsm:p-12 sm:w-4/5 md:w-full md:p-10 sm:mx-auto lg:p-12 xl:w-4/5 relative'>
            {errorMsg && (
                <div className="absolute top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
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
                <div className="absolute top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
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