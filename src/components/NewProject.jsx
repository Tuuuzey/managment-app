import { useState } from "react"
import Input from "./Input"

export default function NewProject({ saveProject, cancelProject }) {
    const [ newProjectData, setNewProjectData ] = useState({
        title: '',
        description: '',
        dueDate: ''
    })
    const [ errors, setErrors ] = useState({});

    function handleChange(value, field) {
        setNewProjectData(prevData=> {return {
            ...prevData, 
            [field]: value
        }})
        setErrors(prevError=> ({
            ...prevError,
            [field]: ''
        }))
    }

    function handleSave() {
        const newErrors = {}
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!newProjectData.title.trim()) {
            newErrors.title = 'Title is required.';
            
        }
        if (!newProjectData.description.trim()) {
            newErrors.description = 'Description is required.';

        }
        if (!newProjectData.dueDate.trim()) {
            newErrors.dueDate = 'Due date is required.';
        }
        if (!dateRegex.test(newProjectData.dueDate.trim())) {
            newErrors.dueDate = 'Date must be in format dd/mm/yyyy.';
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        saveProject(newProjectData);
    }

    function handleCancel() {
        setNewProjectData(prevData=> {return {
            ...prevData, title: '', description: '', dueDate: ''
        }});
        cancelProject()
    }

    return <div className="w-[35rem] mt-16">
        <div>
            <Input label={'Title'} 
            onChange={(e)=> handleChange(e.target.value, 'title')} 
            bgColor={errors.title ? 'bg-red-300' : ''}/>
            { errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            
            <Input label={'Description'} 
            textarea={true}
            onChange={(e)=> handleChange(e.target.value,  'description')} 
            bgColor={errors.description ? 'bg-red-300' : ''}/>
            { errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

            <Input label={'Due Date'} 
            onChange={(e)=> handleChange(e.target.value, 'dueDate')} 
            bgColor={errors.dueDate ? 'bg-red-300' : ''}/>
            { errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}

        </div>
        <menu  className="flex items-center justify-end gap-4 my-4">
            <li><button className="text-stone-800 hover:text-stone-950" onClick={handleCancel}>Cancel</button></li>
            <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button></li>
        </menu>
    </div>
}