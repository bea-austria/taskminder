import Login from './Login';
import Header from './Header';
import UserContext from '../../../../../utils/userContext';
import backgroundImg from '../../assets/landing/taskminder-landing-bg.jpg/'
import { useContext } from 'react';
import Footer from '../Footer'
import Blog from './Blog';
import Contact from './Contact';
import proofs from '../../const/socialProof'
import About from '../About';

function Landing(){
    const {successMsg, errorMsg, setSuccessMsg, setErrorMsg} = useContext(UserContext);

    setTimeout(() => setErrorMsg(''), 2000)
    setTimeout(() => setSuccessMsg(''), 2000)
    return(
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <main>
                <section className="relative flex-grow md:grid md:grid-cols-2 bg-blue-900">
                    <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{backgroundImage: `url(${backgroundImg})` }}></div>

                    <div className="relative p-6 pb-0 xsm:p-8 xsm:pb-0 sm:p-12 sm:pb-0 md:p-10 lg:p-12 ">
                        <h1 className='text-3xl mb-3 text-white sm:text-4xl lg:text-5xl' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>Effortlessly manage your team</h1>
                        <p className='text-base text-white sm:text-lg md:text-lg lg:text-xl lg:my-6' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }}>The Remote Employee Productivity Tracker is a comprehensive tool designed to monitor and enhance the productivity of remote employees. This tool ensures accountability and helps maintain productivity in a remote working environment.</p>
                        <a href="#about">
                            <button className="bg-indigo-50 text-base hover:bg-indigo-100 text-blue-900 font-bold mt-4 py-2 px-3 lg:text-xl lg:py-4 lg:px-6 rounded border border-gray-300 sm:text-lg">
                                Learn about TaskMinder
                            </button>
                        </a>
                    </div>

                    <div className='relative p-6 xsm:p-12 sm:w-4/5 md:w-full md:p-10 sm:mx-auto lg:p-12 xl:w-4/5'>
                    {errorMsg && (
                        <div className="animate-slow-bounce absolute z-50 top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
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
                        <div className="animate-slow-bounce absolute z-50 top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
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
                </section>

                <About/>

                <Blog/>

                <section className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                    <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                        {proofs.map((proof, index)=>(
                        <div className="flex flex-col items-center justify-center" key={index}>
                            <dt className="mb-2 text-3xl md:text-4xl font-bold">{proof.figure}</dt>
                            <dd className="font-semibold md:text-lg text-gray-500 dark:text-gray-400">{proof.text}</dd>
                        </div>
                        ))}
                    </dl>
                </section>

                <section className="bg-blue-900 dark:bg-gray-900 opacity-90">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                            <h2 className="mb-4 text-2xl lg:text-4xl tracking-tight leading-tight text-white dark:text-white">Start your free trial today</h2>
                            <p className="mb-6 font-light text-white md:text-lg">Try TaskMinder for 30 days. No credit card required.</p>
                            <a href="#" className="bg-indigo-50 hover:bg-indigo-100 text-blue-900 dark:focus:ring-primary-800focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Free trial for 30 days</a>
                        </div>
                    </div>
                </section>

                <Contact/>
            </main>
            <Footer/>
        </div>
    )
}

export default Landing;