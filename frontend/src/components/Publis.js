import './Publis.css';
import { BsTrash, BsPencil, BsFillEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { imgsSaves } from '../services/userService';

const Publis = ({ publis, userToken, userAuth, handleDelete, handleEdit })=>{

    return(
        <div className="myPublis">

            {publis.map((publi) => (
                <div className="publi" key={publi._id}>

                    <div>
                        <p>{publi.title}</p>
                    </div>
                    <div>
                        <img src={
                            `${imgsSaves}/publication/${publi.image}`
                        } alt={publi.title} />
                    </div>

                    
                    <div className="optionsPubli">
                            <Link to={`/publi/${publi._id}`} className='svgViewMore'>
                                <BsFillEyeFill />
                            </Link>
                            {(userToken && userToken._id === userAuth._id) && (
                                <>
                                    <a href='#form' onClick={() => handleEdit(publi)}><BsPencil /></a>
                                    <BsTrash onClick={() => handleDelete(publi._id)} />
                                </>                                
                            )}                    
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Publis;