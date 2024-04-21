import PageHeader from "./PageHeader";
import { useState, useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UserContext from "../../utils/userContext";

function Projects(){
    const [showToolTip, setShowToolTip] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {handleNewProject} = useContext(UserContext);

    function handleModal(){
        setShowModal(!showModal);
    };

    let validationSchema = Yup.object().shape({
        name: Yup.string().required('Project name is required'),
        category: Yup.string().required('Please choose a category'),
        description: Yup.string().required('Please provide a project description.')
        .min(10, 'Description is too short!'),
        target_hours: Yup.string()
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid format.')
        .required('Required.'),
      });

    return(
        <>
            <PageHeader h1={'Projects'} handleModal={handleModal}/>
            <div className="grid grid-cols-3">
                <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Technical SEO Research</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <div className="flex justify-between items-center">
                        <p>Target hours: 3:00:00</p>
                        <a href="#" className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onMouseEnter={()=>setShowToolTip(true)} onMouseLeave={()=>setShowToolTip(false)}>
                            <span className="rtl:rotate-180 flex justify-center items-center w-5 h-5 material-symbols-outlined text-4xl" aria-hidden="true">
                            play_arrow
                            </span>
                        </a>
                        { showToolTip &&
                        <div className="absolute z-10 -right-0.5 bottom-1/3 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                        <div className="text-gray-900 text-sm font-medium">Start Tracker</div>
                        <div className="tooltip-arrow"></div>
                        </div>
                        }
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={()=>setShowModal(false)}></div>
            )}

            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${showModal === false && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add a Project
                            </h3>
                            <a className="text-gray-400 bg-transparent cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleModal}>
                                <span className="material-symbols-outlined">
                                close
                                </span>
                                <span className="sr-only">Close modal</span>
                            </a>
                        </div>

                        <Formik
                        initialValues={{
                        name: '',
                        target_hours: '',
                        category: '',
                        description: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit= {(values) => {
                        handleModal();
                        handleNewProject(values);
                        }}
                        >
                        {({ errors, touched }) => (
                        <Form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required/>
                                    {errors.name && touched.name ? (
                                    <p className="text-red-500">{errors.name}</p>
                                    ) : null
                                    }
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="target_hours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Hours</label>
                                    <Field type="text" name="target_hours" id="target_hours" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="HH:MM:SS" required/>
                                    {errors.target_hours && touched.target_hours ? (
                                    <p className="text-red-500">{errors.target_hours}</p>
                                    ) : null
                                    }
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <Field as="select" name='category' id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                        <option value={''}>Select category</option>
                                        <option value="research">Research</option>
                                        <option value="client communication">Client Communication</option>
                                        <option value="coding">Coding</option>
                                        <option value="break">Break</option>
                                        <option value="others">Others</option>
                                    </Field>
                                    {errors.category && touched.category ? (
                                    <p className="text-red-500">{errors.category}</p>
                                    ) : null
                                    }
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                                    <Field as="textarea" minLength='10' maxLength='200' name='description' id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write project description here" required/>                    
                                    {errors.description && touched.description ? (
                                    <p className="text-red-500">{errors.description}</p>
                                    ) : null
                                    }
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <span className="me-1 material-symbols-outlined">
                                add
                                </span>
                                Add
                            </button>
                        </Form>)}
                        </Formik>
                    </div>
                </div>
            </div> 
        </>
    )
}
export default Projects;