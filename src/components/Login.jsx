import { useState } from "react";

function Login(){
    const[isRegistered, setIsRegistered] = useState('false');

    function handleRegistration(){
      setIsRegistered(!isRegistered);
    }

    function handlePWReset(){
      console.log('hello')
    }

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center items-center pb-8 bg-white rounded-lg border-2">
        <div className="sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isRegistered ? "Sign in to your account" : "Join TaskMinder"}
          </h2>
        </div>

        <div className="mt-6 sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST">
            {
              !isRegistered && 
              <>
                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder='Your first name'
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder='Your last name'
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            }

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Work email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder='Your work email'
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder='Your password'
                  className="block w-full rounded-md p-1.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isRegistered ? "Log In" : "Create Your Account"}
              </button>
            </div>
          </form>

          <p className="mt-5 text-left text-sm text-gray-500 pb-6 border-b-2">
            {isRegistered ? "Forgot Password?" : "Already Have an Account?"}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={isRegistered ? handlePWReset : handleRegistration}>
              {isRegistered ? "Click here" : "Log in here"}
            </a>
          </p>

          { isRegistered && <div className='flex justify-center mt-4 items-center gap-10'>
            <p>
              New to TaskMinder?
            </p>
            <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded border border-gray-300" onClick={handleRegistration}>
              Get Started
            </button>
          </div>}
        </div>
      </div>
    )
}

export default Login;