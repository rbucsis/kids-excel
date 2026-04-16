import { useState } from 'react';
import config from '../config/config.jsx';
import { ImCross } from "react-icons/im";

function handleEnter(ev) {
    if (ev.key === 'Enter' && ev.target.value) {
        console.log("Enter Pressed!")
        console.log(ev.target.value)
    }
}

function handleRemove(key, value) {
    
}

function handleChange(ev) {
    const key = ev.target.name
    const value = ev.target.value
    setForm((prev) => {
        return {
            ...prev,
            [key]: value
        }
    })
}

function StudentForm(closeCallback, { id, created_utc, updated_utc, created_by, updated_by, record_status, org_id, ...data }) {
    const [form, setForm] = useState(data || {})
    console.log(data.languages)
    return (
        <div className="absolute w-[100vw] h-[100vh] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="p-2 w-[100vw] md:w-[80vw] w-max-[100vw] h-[100vh] md:h-[80vh] h-max-[100vh] bg-white rounded-md overflow-hidden border-2 border-[#B795E4]">
                <div className="w-full flex justify-between border-b border-b-[#B795E4]">
                    <div>{id ? "Edit" : "Create"} Student</div>
                    {config.icons.cancel(closeCallback)}
                </div>
                <div className="w-full h-full md:flex md:flex-wrap content-start">
                    <div className='w-full md:w-1/2'>
                        <input id='first_name' name='first_name' defaultValue={form.first_name} placeholder='First Name' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input id='last_name' name='last_name' defaultValue={form.last_name} placeholder='Last Name' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input id='short_name' name='short_name' defaultValue={form.short_name} placeholder='Short Name' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input type='date' id='birthdate' name='birthdate' defaultValue={form.birthdate} placeholder='Date of Birth' />
                    </div>
                    <div className='w-full md:w-1/2 flex flex-wrap'>
                        <div className='w-full'>
                            <input id='languages' onKeyDown={handleEnter}/>
                            <div className='hidden w-54 border rounded-md'></div>
                            {form.languages?.map(l => (<div name="languages" className='flex'><div>{l}</div><ImCross id={l} /></div>))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentForm