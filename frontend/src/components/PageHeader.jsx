import { useState, useContext } from "react";
import { dashOptions }  from "../const/navLinks.js";
import { Link } from "react-router-dom";
import UserContext from "../../utils/userContext.js";

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function PageHeader({h1}){
    const[dropDown, setDropDown] = useState(false);
    const {handleSignOut} = useContext(UserContext);
    const [showToolTip, setShowToolTip] = useState(false);

    function showDropDown(){
        setDropDown(!dropDown);
    }

    function handleLogOff(){
        handleSignOut();
    }

    const date = new Date();
    return(
        <section className="flex justify-between mb-10">
            <div className={h1 == 'Projects' ? 'relative' : ''}>
                <h1 className='text-4xl font-bold mb-2'>{h1}</h1>
                <span className='text-lg'>{formatDate(date)}</span>
                {h1 === 'Projects' && 
                <a href="#" className="absolute -right-6 bottom-4" onMouseEnter={()=>setShowToolTip(true)} onMouseLeave={()=>setShowToolTip(false)}>
                    <span class="material-symbols-outlined text-3xl text-blue-700 cursor-pointer hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    add_circle
                    </span>
                </a>
                }
                { h1 === 'Projects' && showToolTip &&
                    <div className="absolute z-10 -right-0.5 bottom-1/3 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                    <div className="text-gray-900 text-sm font-medium">Add Project</div>
                    <div className="tooltip-arrow"></div>
                    </div>
                }
            </div>
            <ul className="flex gap-3">
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
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Settings
                                </a>
                            </li>
                            <li onClick={handleLogOff}>
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
            </ul>
        </section>
    )
};

export default PageHeader;