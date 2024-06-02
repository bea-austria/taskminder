
import { useContext } from "react";
import { dashOptions } from "../../src/const/navLinks.js";
import UserContext from "../../../../utils/userContext.js";
import {Link } from 'react-router-dom';

function DashOptions(){
    const {dropDown, showDropDown, handleSignOut} = useContext(UserContext);
    return(
        <>
        {dashOptions.map((option, index)=>(
            <li key={index} className={option.icon === 'account_circle' ? 'relative' : ''}> 
                <Link to={option.path} onClick={option.icon === 'account_circle' ? showDropDown : undefined}>
                    <span className="material-symbols-outlined text-2xl cursor-pointer">
                        {option.icon}
                    </span>
                </Link>
                {option.icon === 'account_circle' && dropDown 
                ? 
                <div
                id="dropdown"
                className={`z-10 ${dropDown ? '' : 'hidden'} absolute right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <Link to='/dashboard' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Settings
                            </a>
                        </li>
                        <li onClick={handleSignOut}>
                            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Sign out
                            </Link>
                        </li>
                    </ul>
                </div>
                : ""
                }
            </li>
        ))}
        </>
    )
}

export default DashOptions;