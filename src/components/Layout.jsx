import { Link } from 'react-router-dom';
import Nav from './Navigation';

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col h-[100vh] w-[100vw]'>
            <header className='h-10 p-2'>
               <Link to="/">Kids ExCEl</Link>
            </header>
            <div className='flex grow'>
                <Nav />
                <main className='h-[100%] w-[100%] overflow-y-auto bg-[#EEE] border-2 rounded-md border-[#B795E4]'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;