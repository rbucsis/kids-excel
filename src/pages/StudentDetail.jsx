import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import StudentForm from "../components/StudentForm.jsx"

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function StudentDetail() {
    const { id } = useParams();
    const [ tab, setTab ] = useState("Family");
    const [ isEditing, setEditing ] = useState(true)
    const {data: student, isLoading, error } = useQuery({
        queryKey: ['students', id],
        queryFn: () => fetch("http://localhost:8000/students/"+(id)).then(res => res.json())
    })

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <div className='p-2'>
            <button onClick={() => setEditing(true)} disabled={isEditing}>Edit</button>
            <h1>{ (student.first_name + " " + (student.last_name || "")).trim() }</h1>
            <h2>{ student.short_name }</h2>
            {student.birthdate && (
                <div>
                    <div>
                        Birthday: {student.birthdate}
                    </div>
                    <div>
                        Age: {calculateAge(new Date(student.birthdate))}
                    </div>
                </div>
            )}
            {student.languages && (
                <div className="w-full">
                    Languages: {student.languages?.join(", ")}
                </div>
            )}
            {student.allergies && (
                <div className="w-full">
                    Languages: {student.allergies?.join(", ")}
                </div>
            )}
            <div className="flex justify-around">
                <div className={"w-[200px] text-center " + (tab === 'Family' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Family")}>Family</div>
                <div className={"w-[200px] text-center " + (tab === 'Food' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Food")}>Food</div>
                <div className={"w-[200px] text-center " + (tab === 'Self-Care' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Self-Care")}>Self-Care</div>
                <div className={"w-[200px] text-center " + (tab === 'Development' ? "border-b-2 border-[#B795E4] bg-[#B795E4] rounded-tr-md rounded-tl-md" : "")} onClick={() => setTab("Development")}>Development</div>
            </div>
            <div className="p-2 flex border-2 border-[#B795E4] rounded-md">
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
            {isEditing && (
                <StudentForm 
                    closeCallback={() => setEditing(false)} 
                    student={student} 
                />
            )}
        </div>
    )
}

export default StudentDetail