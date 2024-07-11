function Contact(){
    return(
        <section className="lg:grid lg:grid-cols-2 p-4" id="contact">
            <div className="bg-white dark:bg-gray-900">
                <div className="py-3 px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
                    <div className="mx-auto max-w-screen-md sm:text-center">
                        <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-gray-900 sm:text-2xl dark:text-white">Sign up for our newsletter</h2>
                        <p className="mx-auto mb-6 max-w-xsm font-light text-gray-500 sm:text-md dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                        <form action="#">
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-xsm sm:flex sm:space-y-0">
                                <div className="relative w-3/4">
                                    <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <span className="material-symbols-outlined text-lg">
                                    mail
                                    </span>
                                    </div>
                                    <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="newsletter-email" required=""/>
                                </div>
                                <div>
                                    <button type="submit" className="py-3 px-5 sm:w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-blue-900 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-xsm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-blue-900 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="md:grid md:grid-cols-4 md:gap-8 lg:gap-6 lg:items-start px-6 lg:py-2 mt-4 lg:mt-0">
                <div>
                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                    <a className="text-blue-900 leading-relaxed">example@email.com</a>
                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                    <a href="#" className="leading-relaxed">123-456-7890</a>
                </div>
                <div>
                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">FACEBOOK</h2>
                    <a href="#" className="leading-relaxed">taskminder_help</a>
                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">TWITTER</h2>
                    <a href="#" className="leading-relaxed">taskminder_tweets</a>    
                </div>
                <div>
                    <a href="#" className="title-font font-semibold text-gray-900 tracking-widest text-xs block">PRIVACY POLICY</a>
                    <a href="#" className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4 block">HELP CENTER</a>
                    <a href="#" className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4 block">TERMS</a>
                </div>
                <div>
                    <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                    <p className="mt-1">11650 Olio Road, Suite #1000 - 193 Fishers, IN 46037</p>
                </div>
            </div>
        </section>
    )
}

export default Contact