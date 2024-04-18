import logo from "../assets/logo/taskminderlogo.svg"


function Header(){
    return (

    <header className="flex justify-between px-6 py-5 lg:px-8">
        <div>
          <a href="#" className="-m-1.5 p-1.5 flex justify-center gap-3">
            <span className="sr-only">TaskMinder</span>
            <img className="h-10 w-auto" src={logo} alt="TaskMinder logo" />
            <span className="text-2xl">TaskMinder</span>
          </a>
        </div>
        <nav className="flex max-w-3xl items-center justify-between gap-10" aria-label="Global">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            About
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a>
      </nav>
    </header>
    )
}

export default Header;