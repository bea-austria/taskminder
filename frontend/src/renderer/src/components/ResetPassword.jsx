import logo from '../assets/logo/taskminderlogo.svg';
import FormFields from './website-landing/FormFields';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import UserContext from '../../../../utils/userContext';
import { useContext, useState } from "react";
import { resetPWFields } from '../const/formFields';
import { Link } from 'react-router-dom';

function ResetPassword(){
    const {handlePWReset, isTokenValid, errorMsg, successMsg, setErrorMsg, setSuccessMsg} = useContext(UserContext);
    const[isSubmitted, setIsSubmitted] = useState(false);

    setTimeout(() => setErrorMsg(''), 2000)
    setTimeout(() => setSuccessMsg(''), 2000)

    //Validation rules for new password
    const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
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
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo"/>
                    TaskMinder   
                </a>

                    {errorMsg && (
                        <div className="animate-slow-bounce absolute z-50 top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <span className="material-symbols-outlined flex-shrink-0 inline me-3">
                            info
                            </span>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Error!</span> {errorMsg}.
                            </div>
                        </div>
                    )}

                    {successMsg && (
                        <div className="animate-slow-bounce absolute z-50 top-0 left-0 right-0 mx-auto flex items-center p-4 mb-4 text-sm w-fit text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                            <span className="material-symbols-outlined flex-shrink-0 inline me-3">
                            info
                            </span>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Success!</span> {successMsg}.
                            </div>
                        </div>
                    )}

                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>

                    {isTokenValid && <Formik
                    initialValues={{
                    email: '',
                    password: '',
                    confirmPW: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit= {(values, {resetForm}) => {
                    setIsSubmitted(true);
                    setTimeout(()=> {
                        handlePWReset(values)
                    }, 1000);
                    setTimeout(()=> {
                        resetForm()
                    }, 3000)
                    }}
                >

                {({ errors, touched }) => (
                    <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    { (resetPWFields).map((fieldDetails, index) => (
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
                        Reset Password
                    </button>
                    </div>

                    </Form>
                    )}
                </Formik>}

                {errorMsg &&
                    <div>
                        <p>{errorMsg}</p>
                        <p className="mt-5 text-left text-sm text-gray-500 pb-6 border-b-2">
                            <Link to="/" className="font-semibold leading-6 text-blue-900 hover:text-blue-900" onClick={()=>setErrorMsg('')}>
                            Go to home page
                            </Link>
                        </p>
                    </div>
                }
                </div> 
            </div> 
        </section>
    )
}

export default ResetPassword;