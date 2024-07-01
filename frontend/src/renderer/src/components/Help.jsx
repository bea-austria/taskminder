import PageHeader from './PageHeader.jsx';
import faqs from '../../src/const/faqs.js';

function Help(){
    return(
        <>
            <PageHeader h1={'Support'}/>
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