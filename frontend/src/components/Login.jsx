import { useState, useContext } from "react";
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UserContext from "../../utils/userContext";


function Login(){
    const[isRegistered, setIsRegistered] = useState(true);
    const {handleLogIn, handleRegistration} = useContext(UserContext);

    //Handles registration of new user
    function handleIsRegister(){
      setIsRegistered(!isRegistered);
    }

    //Handles password reset
    function handlePWReset(){
      console.log('hello')
    }

    //Submits user information based on intended action
    function handleSubmit(values){
      if(values.firstName){
        handleRegistration(values);
      }else{
        handleLogIn(values);
      }
    }

    //Validation rules for login
    let validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .required('Password is required')
    });

    //Additional validation rules for registration
    const registerValidationSchema = validationSchema.shape({
      firstName: Yup.string()
        .min(2, 'First name is too short!')
        .max(50, 'First name is too long!')
        .required('Please provide your first name'),
      lastName: Yup.string()
        .min(2, 'Last name is too short!')
        .max(50, 'Last name is too long!')
        .required('Please provide your last name'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
        .matches(/\d/, "Password should contain at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
      confirmPW: Yup.string()
        .when("password", (password, schema) => {
          if (password) {
            return schema
              .required("Password confirmation is required")
              .oneOf([Yup.ref("password")], "Passwords do not match");
          }
        }),
    });

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center items-center pb-8 bg-white rounded-lg border-2">
        <div className="sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isRegistered ? "Sign in to your account" : "Join TaskMinder"}
          </h2>
        </div>

        <div className="mt-6 sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPW: '',
            }}
            validationSchema={isRegistered ? validationSchema : registerValidationSchema}
            onSubmit= {(values) => {
              handleSubmit(values)
            }}
          >
            {({ errors, touched }) => (
                <Form className="space-y-6">
                {
                  !isRegistered && 
                  <>
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                      </label>
                      <div className="mt-2">
                        <Field
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder='Your first name'
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.firstName && touched.firstName ? (
                          <p className="text-red-500">{errors.firstName}</p>
                          ) : null
                        }
                      </div>
                    </div>
  
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                      </label>
                      <div className="mt-2">
                        <Field
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder='Your last name'
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.lastName && touched.lastName ? (
                          <p className="text-red-500">{errors.lastName}</p>
                          ) : null
                        }
                      </div>
                    </div>
                  </>
                }
  
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Work email
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder='Your work email'
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-500">{errors.email}</p>
                      ) : null
                    }
                  </div>
                </div>
  
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder='Your password'
                      className="block w-full rounded-md p-1.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && touched.password ? (
                      <p className="text-red-500">{errors.password}</p>
                      ) : null
                    }
                  </div>
                </div>

                {!isRegistered && 
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmPW" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="confirmPW"
                      name="confirmPW"
                      type="password"
                      placeholder='Confirm your password'
                      className="block w-full rounded-md p-1.5 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.confirmPW && touched.confirmPW ? (
                      <p className="text-red-500">{errors.confirmPW}</p>
                      ) : null
                    }
                  </div>
                </div>
                }
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isRegistered ? "Log In" : "Create Your Account"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
      
          <p className="mt-5 text-left text-sm text-gray-500 pb-6 border-b-2">
            {isRegistered ? "Forgot Password?" : "Already Have an Account?"}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={isRegistered ? handlePWReset : handleIsRegister}>
              {isRegistered ? "Click here" : "Log in here"}
            </a>
          </p>

          { isRegistered && <div className='flex justify-center mt-4 items-center gap-10'>
            <p>
              New to TaskMinder?
            </p>
            <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded border border-gray-300" onClick={handleIsRegister}>
              Get Started
            </button>
          </div>}
        </div>
      </div>
    )
}

export default Login;