import './DatasUser.css';
import { BsFillPersonFill } from 'react-icons/bs';
import { imgsSaves } from '../services/userService';

const DatasUser = ({ userToken, userId })=>{
    return(
        <div className="datasUser">
            {userToken && (
                <>
                    {userToken.image ? (
                        <img src={`${imgsSaves}/user/${userToken.image}`} alt={userToken.name} />
                    ) : (
                        <div className="imageDefault">
                            <BsFillPersonFill />
                        </div>
                    )}
                    <div className="dataUser">
                        <p>{userToken.name}</p>
                        <p>{userToken.description}</p>
                    </div>
                </>
            )}

            {userId && (
                <>
            
                    {userId.image ? (
                        <img src={`${imgsSaves}/user/${userId.image}`} alt={userId.name} />
                    ) : (
                        <div className="imageDefault">
                            <BsFillPersonFill />
                        </div>
                    )}
                    <div className="dataUser">
                        <p>{userId.name}</p>
                        <p>{userId.description}</p>
                    </div>
                </>
            )}
            
        </div>
    )
}

export default DatasUser;
