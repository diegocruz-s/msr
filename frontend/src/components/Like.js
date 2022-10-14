import './Like.css'; 
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { publiLike, resetStates } from '../slices/publiSlice';
const Like = ({ publi, userAuth })=>{

    const dispatch = useDispatch();
    const handleLike = (id) =>{
        dispatch(publiLike(id));
        dispatch(resetStates());
    }

    return(
        <>
            {userAuth && (
                <div className="componenteLike">
                    {(publi.likes && publi.likes.includes(userAuth._id)) ? (
                        <div className="componentLike">
                            <BsHeartFill /> <span>({publi.likes.length})</span>
                        </div>
                    ) : (
                        <div className="componentLike">
                            {/* onclick add like */}
                            {publi.likes ? (
                                <>
                                    <BsHeart onClick={() => handleLike(publi._id)} /> <span>({publi.likes.length})</span>
                                </>
                            ) : (
                                <>
                                    <BsHeart onClick={() => handleLike(publi._id)} /> <span>(0)</span>
                                </>
                            )}
                        </div>
                    )}

                </div>
            )}
            

            
        </>
    )
}

export default Like;
