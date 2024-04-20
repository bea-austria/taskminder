import { dashOptions }  from "../const/navLinks.js";
import { Link } from "react-router-dom";

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function PageHeader({h1}){

    const date = new Date();
    return(
        <section className="flex justify-between mb-10">
            <div>
                <h1 className='text-4xl font-bold mb-2'>{h1}</h1>
                <span className='text-lg'>{formatDate(date)}</span>
            </div>
            <ul className="flex gap-3">
                {dashOptions.map((option, index)=>(
                    <li key={index}>
                        <Link to={option.path}>
                            <span className="material-symbols-outlined text-2xl cursor-pointer">
                                {option.icon}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default PageHeader;