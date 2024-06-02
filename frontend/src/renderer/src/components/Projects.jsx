import PageHeader from "./PageHeader";
import { useState, useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UserContext from "../../../../utils/userContext";

function Projects(){
    const [showModal, setShowModal] = useState(false);
    const {
        user,
        handleNewProject, 
        handleEdit, 
        projects, 
        handleDelete, 
        errorMsg, 
        successMsg, 
        setSuccessMsg, 
        setErrorMsg, 
        startTracker, 
        pauseTracker, 
        trackerBtns,
        timer} = useContext(UserContext);
    const [toolTips, setToolTips] = useState(Array(projects.length).fill(false));
    const [showdeleteModal, setshowdeleteModal] = useState(false);
    const [formPurpose, setFormPurpose] = useState('add');
    const [project, setProject] = useState({})
 
    //Handles appearance and dissappearance of modal
    function handleModal(){
        setShowModal(!showModal);
    };

    //Handles appearance of tooltip
    function handleMouseEnter(index){
        const currentToolTips = [...toolTips];
        currentToolTips[index] = true;
        setToolTips(currentToolTips);
    };

    //Handles disappearance of tooltip
    function handleMouseLeave(index){
        const currentToolTips = [...toolTips];
        currentToolTips[index] = false;
        setToolTips(currentToolTips);
    };

    //Handles appearance of alert for deleting a project
    function handleDeleteModal(index, e){
        setProject(projects[index]);
        setshowdeleteModal(true);
        e.stopPropagation();
    }

    //Handles deletion of project by calling the responsible app component
    function handleDeleteProject(){
        handleDelete(project.id);
        setshowdeleteModal(false);
        setProject({});
    }

    //Allows user to edit project information
    function handleEditProject(project){
        setProject(project);
        setFormPurpose('edit');
        setShowModal(true);
    }

    //Starts or pause tracker for a specific project
    function handleTracking(e, project, index){
        e.stopPropagation();
        if(trackerBtns[index] === 'start'){
            startTracker(project, index);
            // setProject(project)
        }else{
            pauseTracker(index);
        }
    }

    //removes error or success alert after 3 seconds
    setTimeout(() => setErrorMsg(''), 4000)
    setTimeout(() => setSuccessMsg(''), 4000)

    let validationSchema = Yup.object().shape({
        name: Yup.string().required('Project name is required'),
        category: Yup.string().required('Please choose a category'),
        description: Yup.string().required('Please provide a project description.')
        .min(10, 'Description is too short!'),
        limit_hours: Yup.string()
        .max(8, 'Max limit_hours is 8 hours'),
      });

    return(
        <>
            <PageHeader h1={'Projects'} handleModal={handleModal}/>
            {errorMsg && (
                <div className="flex items-center p-4 mb-4 text-sm w-fit text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
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
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <span className="material-symbols-outlined flex-shrink-0 inline me-3">
                info
                </span>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Success!</span> {successMsg}.
                </div>
              </div>
            )}

            <div id="toast-success" className="flex items-center w-fit p-4 mb-4 text-gray-900 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-900 bg-green-100 rounded-lg dark:bg-blue-900 dark:text-green-200">
                    <span className="material-symbols-outlined">
                    timer
                    </span>
                    <span className="sr-only">Timer icon</span>
                </div>
                <p className="ms-3 text-2xl font-normal">{timer ? `${timer.hours}:${timer.minutes}:${timer.seconds}` : project.worked_hours}</p>
            </div>

            <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:gap-y-6">
                {projects.map((project, index)=> (
                    <div key={index} className="relative max-w-sm p-6 mb-4 lg:mb-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={()=>{handleEditProject(project)}}>
                        <span className="material-symbols-outlined absolute top-[5px] right-[15px] cursor-pointer text-2xl" onClick={(e)=> handleDeleteModal(index, e)}>
                        remove
                        </span>
                        <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
                    <div className="flex justify-between items-center">
                        <p>Worked hours: {project.worked_hours ? project.worked_hours : '00:00:00'}</p>
                        <a href="#" className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900" onMouseEnter={()=>handleMouseEnter(index)} onMouseLeave={()=>handleMouseLeave(index)} onClick={(e) => {handleTracking(e, project, index)}}>
                            <span className="rtl:rotate-180 flex justify-center items-center w-5 h-5 material-symbols-outlined text-4xl" aria-hidden="true">
                            {trackerBtns[index] === 'start' ? 'play_arrow' : 'pause'}
                            </span>
                        </a>
                        { toolTips[index] &&
                        <div className="absolute z-10 -right-0.5 bottom-1/3 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                        <div className="text-gray-900 text-sm font-medium">{trackerBtns[index] === 'start' ? 'Start Tracker' : 'Pause Tracker'}</div>
                        <div className="tooltip-arrow"></div>
                        </div>
                        }
                    </div>
                </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            )}

            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${showModal === false && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add a Project
                            </h3>
                            <a className="text-gray-400 bg-transparent cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={()=>{setShowModal(false); setProject({})}}>
                                <span className="material-symbols-outlined">
                                close
                                </span>
                                <span className="sr-only">Close modal</span>
                            </a>
                        </div>

                        <Formik
                        enableReinitialize={true}
                        initialValues={{
                        name: project.name || '',
                        limit_hours: project.limit_hours || 0,
                        category: project.category || '',
                        description: project.description || ''
                        }}

                        validationSchema={validationSchema}

                        onSubmit= {(values, {resetForm}) => {
                        values.id = project.id;
                        values.user_id = user.id;
                        handleModal();
                        if(formPurpose == 'edit'){
                            handleEdit(values)
                        }else{
                            handleNewProject(values);
                        }
                        setTimeout(()=>{
                            resetForm()
                        }, 1000)
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

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="limit_hours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">limit_hours (optional)</label>
                                    <Field type="number" min='0' name="limit_hours" id="limit_hours" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='0'/>
                                    {errors.limit_hours && touched.limit_hours ? (
                                    <p className="text-red-500">{errors.limit_hours}</p>
                                    ) : null
                                    }
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                                    <Field as="textarea" minLength='10' maxLength='200' name='description' id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900" placeholder="Write project description here" required/>                    
                                    {errors.description && touched.description ? (
                                    <p className="text-red-500">{errors.description}</p>
                                    ) : null
                                    }
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900">
                                {formPurpose === 'edit'? 'Edit': 'Add'}
                            </button>

                        </Form>)}
                        </Formik>
                    </div>
                </div>
            </div> 

            {showdeleteModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            )}

                <div id="popup-modal" tabIndex="-1" className={`${showdeleteModal ? '' : 'hidden'} overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=> {setshowdeleteModal(false); setProject({})}}>
                                <span className="material-symbols-outlined absolute text-2xl">
                                close
                                </span>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <span className="material-symbols-outlined mx-auto mb-4 text-gray-400 text-4xl dark:text-gray-200">
                                warning
                                </span>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete {project.name}?</h3>
                                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={handleDeleteProject}>
                                    Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=> {setshowdeleteModal(false); setProject({})}}>No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Projects;