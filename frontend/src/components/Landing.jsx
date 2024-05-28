import Login from './Login'
import Header from './Header'
import UserContext from '../../utils/userContext';
import { useContext } from 'react';
import Footer from './Footer';
import Blog from './Blog';

function Landing(){
    const {successMsg, errorMsg, setSuccessMsg, setErrorMsg} = useContext(UserContext);

    setTimeout(() => setErrorMsg(''), 2000)
    setTimeout(() => setSuccessMsg(''), 2000)
    return(
        <div className='min-h-screen flex flex-col'>
        <Header/>
        <main className="flex-grow md:grid md:grid-cols-2 bg-blue-900">
            <div className="p-6 pb-0 xsm:p-8 xsm:pb-0 sm:p-12 sm:pb-0 md:p-10 lg:p-12 ">
                <h1 className='text-3xl mb-3 text-white sm:text-4xl lg:text-5xl'>Effortlessly manage your team</h1>
                <p className='text-base text-white sm:text-lg lg:text-xl lg:my-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique ducimus labore repellendus eum. Dignissimos harum corrupti nam veritatis numquam, fugiat maxime expedita quo voluptatem placeat repudiandae quam saepe assumenda.</p>
                <button className="bg-indigo-50 text-base hover:bg-indigo-100 text-blue-900 font-bold mt-4 py-2 px-3 lg:text-xl lg:py-4 lg:px-6 rounded border border-gray-300 sm:text-lg">
                    Learn about TaskMinder
                </button>
            </div>

            <div className='p-6 xsm:p-12 sm:w-4/5 md:w-full md:p-10 sm:mx-auto lg:p-12 xl:w-4/5 relative '>
            {errorMsg && (
                <div className="animate-bounce absolute top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
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
                <div className="animate-bounce absolute top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
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
        <Blog/>
        <section className="bg-blue-900 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-2xl lg:text-4xl tracking-tight leading-tight text-white dark:text-white">Start your free trial today</h2>
                    <p className="mb-6 font-light text-white md:text-lg">Try TaskMinder for 30 days. No credit card required.</p>
                    <a href="#" className="bg-indigo-50 hover:bg-indigo-100 text-blue-900 dark:focus:ring-primary-800focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Free trial for 30 days</a>
                </div>
            </div>
        </section>
        <Footer/>
        </div>
    )
}

export default Landing;