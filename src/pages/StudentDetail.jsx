import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function StudentDetail() {
    const { id } = useParams();
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState(null)
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
            { JSON.stringify(student) }
        </div>
    )
}

export default StudentDetail