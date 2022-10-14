import './Navbar.css';
import useUserAuth from '../hooks/useUserAuth';
import { BsFillHouseFill, BsPersonCircle, BsFillCameraFill,BsFillDoorOpenFill, BsFillShieldLockFill } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = ()=>{

    const { auth } = useUserAuth();
    const dispatch = useDispatch();

    const handleLogout = async ()=>{
        await dispatch(logout());
    }

    return(
        
        <nav id="navbar">
            {auth ? (
                <div id="navAuth">
                    
                    <ul>
                        <li>
                            <NavLink to='/' end>
                                <BsFillHouseFill />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/profile'>
                                <BsPersonCircle />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard'>
                                <BsFillCameraFill />
                            </NavLink>
                        </li>
                        <li>
                            <Link>
                                <BsFillDoorOpenFill onClick={handleLogout} />
                            </Link>
                        </li>
                    </ul>
                    
                </div>
            ) : (
                <div className="navLogout">
                    <ul>
                        <li>
                            <Link to='/auth'>
                                <BsFillShieldLockFill />
                            </Link>
                        </li>
                    </ul>
                    
                </div>
            )}
        </nav>
    )

}

export default Navbar
