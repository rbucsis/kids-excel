import config from '../config/config.jsx';

function StudentForm(closeCallback, { id, created_utc, updated_utc, created_by, updated_by, record_status, org_id, ...data }) {
    return (
        <div className="absolute w-[100vw] h-[100vh] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="p-2 w-[100vw] md:w-[80vw] w-max-[100vw] h-[100vh] md:h-[80vh] h-max-[100vh] bg-white rounded-md overflow-hidden border-2 border-[#B795E4]">
                <div className="w-full h-full flex flex-wrap flex-top">
                    <div className="w-full border border-black">
                        {config.icons.cancel(closeCallback)}
                    </div>
                    <div className='w-full md:w-1/2'>
                        <input id='first_name' name='first_name' defaultValue={data.first_name} placeholder='First Name' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentForm