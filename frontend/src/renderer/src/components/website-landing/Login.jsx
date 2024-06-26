import { useState, useContext } from "react";
import React from 'react';
import { Formik, Form} from 'formik';
import FormFields from "./FormFields";
import { registrationfields, logInFields, verificationField } from "../../const/formFields";
import * as Yup from 'yup';
import UserContext from '../../../../../utils/userContext';

function Login(){
    const {handleLogIn, handleRegistration, handleEmailVerification} = useContext(UserContext);
    const[isRegistered, setIsRegistered] = useState(true);
    const[isSubmitted, setIsSubmitted] = useState(false);
    const [isPWForgotten, setIsPWForgotten] = useState(false);

    //Handles registration of new user
    function handleIsRegister(){
      setIsRegistered(!isRegistered);
      setIsPWForgotten(false)
    }

    //Submits user information based on intended action
    function handleSubmit(values){
      if(!isPWForgotten){
        if(values.firstName){
          handleRegistration(values);
        }else{
          handleLogIn(values);
        }
      }else{
        handleEmailVerification(values);
      }
    }

    function handleEmailVerifForm(){
      setIsPWForgotten(true);
    }

    //Validation rules for login
    let validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .required('Required')
    });

    //Validation rules for password reset
    const emailValidationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
    });

    //Additional validation rules for registration
    const registerValidationSchema = validationSchema.shape({
      firstName: Yup.string()
        .min(2, 'First name is too short!')
        .max(50, 'First name is too long!')
        .required('Required'),
      lastName: Yup.string()
        .min(2, 'Last name is too short!')
        .max(50, 'Last name is too long!')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required')
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
        .matches(/\d/, "Password should contain at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
      confirmPW: Yup.string()
        .when("password", (password, schema) => {
          if (password) {
            return schema
              .required("Required")
              .oneOf([Yup.ref("password")], "Passwords do not match");
          }
        }),
    });

    return(
        <div className="flex flex-1 flex-col justify-center items-center pb-8 bg-white rounded-lg border-2">
        <div className="xsm:w-4/5">
          <h2 className="mt-3 text-center text-xl xsm:text-xl sm:text-xl sm:mt-5 xsm:text-left lg:text-2xl xlg:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            {!isPWForgotten ? (isRegistered ? "Sign in to your account" : "Join TaskMinder") : "Reset Your Password"}
          </h2>
        </div>

        <div className="mt-4 xsm:w-4/5">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPW: '',
            }}
            validationSchema={!isPWForgotten ? (isRegistered ? validationSchema : registerValidationSchema) : emailValidationSchema}
            onSubmit= {(values, {resetForm}) => {
              setIsSubmitted(true);
              setTimeout(()=> {
                handleSubmit(values)
                setIsSubmitted(false)
              }, 1000);
              setTimeout(()=> {
                resetForm()
              }, 3000)
            }}
          >
            {({ errors, touched }) => (
                <Form className="sm:space-y-4">
                { (!isPWForgotten ? (isRegistered ? logInFields : registrationfields) : verificationField).map((fieldDetails, index) => (
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
                    {!isPWForgotten ? (isRegistered ? "Log In" : "Create Your Account") : "Send Verification Email"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
      
          <p className="mt-5 text-left text-sm text-gray-500 pb-6 border-b-2">
            {!isPWForgotten ? (isRegistered ? "Forgot Password? " : "Already Have an Account? ") : ""}
            <a href='#' className="font-semibold leading-6 text-blue-900 hover:text-blue-900" 
            onClick={
              (!isPWForgotten ? 
              (isRegistered ? handleEmailVerifForm : handleIsRegister) :
              () => {setIsRegistered(true); setIsPWForgotten(false)}
              )}
            >
              {!isPWForgotten ? (isRegistered ? "Click here" : "Log in here") : "Log in to your account"}
            </a>
          </p>

          { isRegistered && <div className='flex justify-center mt-4 items-center gap-2 text-sm sm:text-base'>
            <p>
              New to TaskMinder?
            </p>
            <a href='#' className="text-sm bg-indigo-50 hover:bg-indigo-100 text-blue-900 font-bold py-2 px-4 rounded border border-gray-300 sm:text-base" onClick={handleIsRegister}>
              Get Started
            </a>
          </div>}
        </div>
      </div>
    )
}

export default Login;