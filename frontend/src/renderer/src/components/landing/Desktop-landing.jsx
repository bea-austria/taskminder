import Login from './Login';
import backgroundImg from '../../assets/landing/taskminder-landing-bg.jpg/'
import { useContext } from 'react';
import UserContext from '../../../../../utils/userContext';
import Footer from '../Footer'

function DesktopLanding(){
    const {successMsg, errorMsg} = useContext(UserContext);
    return(
        <div className="relative min-h-screen bg-blue-900 flex justify-center items-center">
            <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{backgroundImage: `url(${backgroundImg})` }}></div>

            <div className='relative w-2/3'>
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
        </div>
    )
}

export default DesktopLanding;