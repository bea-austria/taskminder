import logo from "../assets/logo/taskminderlogo.svg"
import { Link } from "react-router-dom";

function Header(){
    return (

    <header className="flex flex-col xsm:flex xsm:justify-between xsm:flex-row xsm:px-6 sm:py-4 lg:px-8 flex-shrink-0">
        <div className="pt-3 xsm:py-3 sm:py-0">
          <a href="#" className="-m-1.5 p-1.5 flex justify-center gap-3">
            <span className="sr-only">TaskMinder</span>
            <img className="h-10 w-auto" src={logo} alt="TaskMinder logo" />
            <span className="text-2xl">TaskMinder</span>
          </a>
        </div>
        <nav className="flex justify-center gap-8 py-2 text-lg xsm:py-0 sm:max-w-3xl items-center sm:justify-between sm:gap-10 " aria-label="Global">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 sm:text-base">
            About
          </a>
          <Link to="#blog" className="text-sm font-semibold leading-6 text-gray-900 sm:text-base">
            Blog
          </Link>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 sm:text-base">
            Contact
          </a>
      </nav>
    </header>
    )
}

export default Header;