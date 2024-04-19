import Login from './Login'
import Header from './Header'

function Landing({onLog, onRegister}){
    return(
        <>
        <Header/>
        <main className='flex p-12 gap-8 bg-indigo-500'>
            <div className='w-3/5'>
                <h1 className='text-5xl mb-6 text-white'>Effortlessly manage your team</h1>
                <p className='text-xl text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt similique ducimus labore repellendus eum. Dignissimos harum corrupti nam veritatis numquam, fugiat maxime expedita quo voluptatem placeat repudiandae quam saepe assumenda.</p>
                <button className="bg-indigo-50 text-lg hover:bg-indigo-100 text-indigo-600 font-bold mt-10 py-4 px-6 rounded border border-gray-300">
                    Learn about TaskMinder
                </button>
            </div>
            <Login onLog={onLog} onRegister={onRegister}/>
        </main>
        </>
    )
}

export default Landing;