import './Publi.css';
import { imgsSaves } from "../services/userService";
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Like from './Like';

const Publi = ({ publi })=>{

    const { user: userAuth } = useSelector(state => state.auth);

    return(
        <div className="publiComponent">
            <div className="informationsUser">
                <Link to={`/user/${publi.userId}`}>
                    {publi.userImage ? (
                        <img src={`${imgsSaves}/user/${publi.userImage}`} alt={publi.userName} />
                    ) : (
                        <div className="imageDefault">
                            <BsFillPersonFill />
                        </div>
                    )}
                </Link>
                <Link to={`/user/${publi.userId}`} className='nameUser' style={{ textDecoration: 'none' }}>
                    <p>{publi.userName}</p>
                </Link>
                
            </div>

            <div className="publi">
                <p>{publi.title}</p>
                <div className="imgPubliHome">
                    <img src={`${imgsSaves}/publication/${publi.image}`} alt="" />
                </div>
            </div>

            {userAuth && (
                <div className="optionsPubli">
                    <div className="like">
                        <Like publi={publi} userAuth={userAuth} />
                    </div>

                    <div className="viewMorePubli">
                        <Link to={`/publi/${publi._id}`}>
                            <BsFillEyeFill />
                        </Link>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Publi;