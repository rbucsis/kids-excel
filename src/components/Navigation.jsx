import { Link } from 'react-router-dom';
import config from '../config/config.jsx';

const links = config.navigation;

function Item({ label, link }) {
    return (<Link to={"/"+link}><div className='w-full p-2 hover:bg-[#B795E4] transition-colors duration-300'>{label}</div></Link>)
}

function Nav() {
    return (
        <nav className="w-52 h-[100%]">
            {links.map(l => Item(l))}
        </nav>
    )
}

export default Nav;