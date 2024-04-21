import PageHeader from './PageHeader.jsx';
import faqs from '../const/faqs.js';

function Help(){
    return(
        <>
            <PageHeader h1={'Support'}/>
            <form className="max-w-md mx-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            search
                        </span>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What's your question?" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 className="mb-8 text-3xl tracking-tight font-bold text-gray-900 dark:text-white">Frequently asked questions</h2>
                    <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                        {faqs.map((item, index)=>(
                        <div className="mb-10" key={index}>
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            <span className="material-symbols-outlined text-xl flex-shrink-0 mr-2 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">help</span>
                            {item.question}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">{item.answer}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Help;