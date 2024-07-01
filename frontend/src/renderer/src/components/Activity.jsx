import UserContext from "../../../../utils/userContext";
import { useContext} from "react";
import PageHeader from './PageHeader.jsx';

function Activity(){
    const {screenShots, URL} = useContext(UserContext);

    return(
        <>
        <PageHeader h1={'Activity'}/>
        <section className="flex flex-col justify-start">
            {screenShots.length > 0 ?
            <div className="h-full grid grid-cols-2 xsm:grid-cols-3 md:grid-cols-4 mb-4 lg:grid-cols-5 rounded bg-gray-50 dark:bg-gray-800 gap-4">
            {screenShots.map((file, index) => (
                <div key={index} className='flex flex-col justify-start items-center col-span-1'>
                    <img className="h-full w-full rounded-lg shadow-xl dark:shadow-gray-800 object-cover" src={`${URL}/screenshots/${file.filePath}`} alt="screenshot" />
                    <span>{file.time}</span>
                </div>
            ))}
            </div>
            :
            <p className="text-blue-900 mx-auto">You have no activities at the moment</p>
            }
        </section>
        </>
    )
}

export default Activity;