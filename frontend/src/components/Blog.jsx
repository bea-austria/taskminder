import blogs from "../const/blogPosts";

function Blog(){
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-12 mb-5">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">Our Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">TaskMinder provides invaluable insights and strategies tailored specifically for effectively overseeing remote teams, ensuring seamless collaboration and productivity.</p>
                </div> 
                <div className="grid gap-8 lg:grid-cols-2">
                    {blogs.map((blog, index)=>(
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" key={index}>
                            <span className="text-sm text-gray-800">{blog.date}</span>
                            <h2 className="mb-2 mt-3 text-xl sm:text-2xl font-bold tracking-tight text-gray-800 dark:text-white"><a href="#">{blog.title}</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{blog.preview}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <span className="font-medium dark:text-white">
                                    {blog.author}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <a href="#" className="inline-flex items-center font-medium text-blue-900 dark:text-primary-500 hover:underline">
                                        Read more
                                    </a>
                                    <span className="material-symbols-outlined text-lg ml-2 text-blue-900">
                                        arrow_forward
                                    </span>
                                </div>
                            </div>
                        </article>          
                    ))}   
                </div>  
            </div>
        </section>
    )
};

export default Blog;