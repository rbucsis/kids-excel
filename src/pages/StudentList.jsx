import { useQuery } from '@tanstack/react-query';
import { MdPersonOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

function StudentList() {
    const {data: students, isLoading, error } = useQuery({
        queryKey: ['students'],
        queryFn: () => fetch("http://localhost:8000/students").then(res => res.json())
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
            <h1>Students</h1>
            <div className='flex flex-wrap '>
            {students.map((s) => (
                <Link className='flex m-3 p-2 rounded-md border-2 hover:bg-[#B795E4] transition-colors duration-300 border-[#B795E4]' to={"/students/"+s.id}>
                    <div>
                    {s.image ? (
                        <img src="" alt={(s.first_name+" "+s.last_name).trim()+" Picture"}></img>
                    ) : (
                        <MdPersonOutline className='text-2xl'/>
                    )}
                    </div>
                    <div className='ml-2'>
                        {s.first_name+" "+s.last_name}
                    </div>
                </Link>
            ))}
            </div>
        </div>
    )
}

export default StudentList