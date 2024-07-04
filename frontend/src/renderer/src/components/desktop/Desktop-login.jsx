import { useState, useContext } from "react";
import React from 'react';
import { Formik, Form} from 'formik';
import FormFields from "../website-landing/FormFields";
import {logInFields} from "../../const/formFields";
import * as Yup from 'yup';
import UserContext from '../../../../../utils/userContext';


function DesktopLogin(){
    const {handleLogIn} = useContext(UserContext);
    const[isSubmitted, setIsSubmitted] = useState(false);

    //Validation rules for login
    let validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .required('Required')
    });

    return(
        <div className="flex flex-1 flex-col justify-center items-center pb-8 bg-white rounded-lg border-2">
        <div className="xsm:w-4/5">
          <h2 className="mt-3 text-center text-xl xsm:text-xl sm:text-xl sm:mt-5 xsm:text-left lg:text-2xl xlg:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-4 xsm:w-4/5">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit= {(values, {resetForm}) => {
              setIsSubmitted(true);
              setTimeout(()=> {
                handleLogIn(values)
                setIsSubmitted(false)
              }, 1000);
              setTimeout(()=> {
                resetForm()
              }, 3000)
            }}
          >
            {({ errors, touched }) => (
                <Form className="sm:space-y-4">
                {logInFields.map((fieldDetails, index) => (
                    <FormFields
                      key={index}
                      label={fieldDetails.label} 
                      id={fieldDetails.id} 
                      type={fieldDetails.type} 
                      placeholder={fieldDetails.placeholder}
                      errors={errors}
                      touched={touched}
                    />
                  ))
                }
                
                <div className="mt-3">
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:text-base`}
                    disabled={isSubmitted}
                  >
                    { isSubmitted && <span className="material-symbols-outlined animate-spin text-lg text-white">
                    autorenew
                    </span>}
                    Log In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
      
          <p className="mt-5 text-left text-sm text-gray-500 pb-6 border-b-2">
            Forgot Password?
            <a href='https://taskminder-app.vercel.app/' target='_blank' className="font-semibold leading-6 text-blue-900 hover:text-blue-900"> 
              Click here
            </a>
          </p>

          <div className='flex justify-center mt-4 items-center gap-2 text-sm sm:text-base'>
            <p>
              New to TaskMinder?
            </p>
            <a href='https://taskminder-app.vercel.app/' target='_blank' className="text-sm bg-indigo-50 hover:bg-indigo-100 text-blue-900 font-bold py-2 px-4 rounded border border-gray-300 sm:text-base">
              Get Started
            </a>
          </div>
        </div>
      </div>
    )
}

export default DesktopLogin;