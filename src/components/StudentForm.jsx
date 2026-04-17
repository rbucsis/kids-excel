import { useState } from 'react';
import config from '../config/config.jsx';
import { ImCross } from "react-icons/im";


function StudentForm({ closeCallback, student }) {
    // Now you can pull the IDs and data out of the student object
    const { id, created_utc, updated_utc, ...data } = student;
    
    const [form, setForm] = useState(data);
    const [tab, setTab] = useState("Family")

    function handleEnter(ev) {
        if (ev.key === 'Enter' && ev.target.value) {
            const { name, value } = ev.target;
            if (!form[name]?.includes(value)) {
                const update = {[name]: [value]}
                if (form[name]?.length) {
                    update[name] = form[name].concat(update[name])
                }
                setForm(prev => 
                    ({
                        ...prev,
                        ...update
                    })
                );
            }
            ev.target.value = null
        }
    }

    function handleRemove(key, value) {
        setForm(prev => ({
            ...prev,
            languages: prev[key].filter(v => v !== value)
        }));
    }

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const url = "http://localhost:8000/students"+(form.id ? "/"+form.id : "")
        const opts = {
            "method": (form.id ? "PUT" : "POST"),
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(form)
        }
        fetch(url, opts).then((res) => {
            if (res.ok) {
                closeCallback(false)
            } else {
                alert(res.status+" "+res.statusText)
            }
        })
    }

    return (
        <div className="absolute w-[100vw] h-[100vh] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="p-2 w-[100vw] md:w-[80vw] w-max-[100vw] h-[100vh] md:h-[80vh] h-max-[100vh] bg-white rounded-md overflow-hidden border-2 border-[#B795E4]">
                <div className="w-full flex justify-between border-b border-b-[#B795E4]">
                    <div>{id ? "Edit" : "Create"} Student</div>
                    <div className='flex'>
                        <button className='mr-2'>Save</button>
                        {config.icons.cancel(closeCallback)}
                    </div>
                </div>
                <div className="w-full h-full md:flex md:flex-wrap content-start overflow-y-auto">
                    <div className='w-full md:w-1/2'>
                        <input className='w-full' id='first_name' name='first_name' defaultValue={form.first_name} onBlur={handleChange} placeholder='First Name' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input className='w-full' id='last_name' name='last_name' defaultValue={form.last_name} onBlur={handleChange} placeholder='Last Name' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input className='w-full' id='short_name' name='short_name' defaultValue={form.short_name} onBlur={handleChange} placeholder='Short Name' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input className='w-full' type='date' id='birthdate' name='birthdate' defaultValue={form.birthdate} onBlur={handleChange} placeholder='Date of Birth' />
                    </div>
                    <div className='w-full md:w-1/2 flex flex-wrap'>
                        <div className='w-full'>
                            <input className='w-full' id='languages' name="languages" onKeyDown={handleEnter} placeholder='Add Language (Press Enter to submit)'/>
                            <div className='flex flex-wrap w-full'>
                            {form.languages?.map(l => (
                                    <div className='flex m-1 pl-2 pr-2 items-center border-2 border-[#B795E4] rounded-xl bg-[#97A5EE]'>
                                        <div>
                                            {l}
                                        </div>
                                        <div className='pl-2'>
                                            <ImCross size='6' onClick={()=>handleRemove("languages", l)} />
                                        </div>
                                    </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 flex flex-wrap'>
                        <div className='w-full'>
                            <input className='w-full' id='allergies' name="allergies" onKeyDown={handleEnter} placeholder='Add Allergies (Press Enter to add)'/>
                            <div className='flex flex-wrap w-full'>
                            {form.allergies?.map(a => (
                                    <div className='flex m-1 pl-2 pr-2 items-center border-2 border-[#B795E4] rounded-xl bg-[#97A5EE]'>
                                        <div>
                                            {a}
                                        </div>
                                        <div className='pl-2'>
                                            <ImCross size='6' onClick={()=>handleRemove("allergies", a)} />
                                        </div>
                                    </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around w-full">
                        <div className={"w-[200px] text-center " + (tab === 'Family' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Family")}>Family</div>
                        <div className={"w-[200px] text-center " + (tab === 'Food' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Food")}>Food</div>
                        <div className={"w-[200px] text-center " + (tab === 'Self-Care' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Self-Care")}>Self-Care</div>
                        <div className={"w-[200px] text-center " + (tab === 'Development' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Development")}>Development</div>
                    </div>
                    <div className="p-2 flex border-2 border-[#B795E4] rounded-md w-full">
                        <div className="w-full md:flex md:flex-wrap">
                        {tab === 'Family' && (<>
                            <div className="w-full md:w-1/2 mt-2">
                                <h3>Family:</h3>
                                <table className="w-full text-left">
                                    <tbody>
                                        <tr>
                                            <th className="w-1/2 border border-b-[#B795E4] bg-[#97A5EE] rounded-tr-md rounded-tl-md">
                                                Name
                                            </th>
                                            <th className="w-1/4 border border-b-[#B795E4] bg-[#97A5EE] rounded-tr-md rounded-tl-md">
                                                Relationship
                                            </th>
                                            <th className="w-1/4 border border-b-[#B795E4] bg-[#97A5EE] rounded-tr-md rounded-tl-md">
                                                Lives at Home?
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full md:w-1/2 mt-2">
                                <h3>Pets:</h3>
                                <table className="w-full text-left">
                                    <tbody>
                                        <tr>
                                            <th className="w-1/2 border border-b-[#B795E4] bg-[#97A5EE] rounded-tr-md rounded-tl-md">
                                                Name
                                            </th>
                                            <th className="w-1/4 border border-b-[#B795E4] bg-[#97A5EE] rounded-tr-md rounded-tl-md">
                                                Relationship
                                            </th>
                                            <th className="w-1/4 border border-b-[#B795E4] bg-[#97A5EE] rounded-tr-md rounded-tl-md">
                                                Lives at Home?
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>)}
                        {tab==='Food' && (<>
                            <div className="w-full md:w-1/2 mt-2">
                                Appetite: {student.appetite}
                            </div>
                            <div className="w-full md:w-1/2 mt-2">
                                Likes: {student.food_likes?.join(", ")}
                            </div>
                            <div className="w-full md:w-1/2 mt-2">
                                Dislikes: {student.food_dislikes?.join(", ")}
                            </div>
                            <div className="w-full md:w-1/2 mt-2">
                                Restrictions: {student.food_restrictions?.join(", ")}
                            </div>
                            <div className="w-full md:w-1/2 mt-2">
                                Self Feeding: {student.self_feeding ? "Yes" : "No"}
                            </div>
                            <div className="w-full md:w-1/2 mt-2">
                                Feeding Notes: {student.feeding_notes?.join(", ")}
                            </div>
                            <div className="w-full">
                                Feeding Schedule: ---TO DO---
                            </div>
                        </>)}
                        {tab==='Self-Care' && (
                            <div>
                                ---TO DO---
                            </div>
                        )}
                        {tab==='Development' && (
                            <div>
                                ---TO DO---
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentForm