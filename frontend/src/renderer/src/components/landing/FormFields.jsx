import { Field } from 'formik';

function FormFields({label, id, type, placeholder, errors, touched}){
    return(
        <div className="mt-1 sm:mt-0">
            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900 sm:text-base">
            {label}
            </label>
            <div className="mt-1">
            <Field
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
            />
            {errors[id] && touched[id] ? (
                <p className="text-red-500">{errors[id]}</p>
            ) : null}
            </div>
        </div>
    )
}

export default FormFields;