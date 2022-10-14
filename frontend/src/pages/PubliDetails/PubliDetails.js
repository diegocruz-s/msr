import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PubliDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { commentPubli, getPubliId, resetStates } from '../../slices/publiSlice';
import { BsFillPersonFill, BsReceiptCutoff } from 'react-icons/bs';
import { imgsSaves } from '../../services/userService';
import Like from '../../components/Like';
import Message from '../../components/Message';

const PubliDetails = ()=>{

    const dispatch = useDispatch();
    const { user: userAuth } = useSelector(state => state.auth);
    const { publi, success } = useSelector(state => state.publi);
    const [commentText, setCommentText] = useState('');

    const { id } = useParams();

    useEffect(()=>{
        dispatch(getPubliId(id));
        dispatch(resetStates());
    }, [dispatch, id])

    const handleComment = (e) => {
        e.preventDefault();
        
        const newComment = {
            id: id,
            comment: commentText
        }

        dispatch(commentPubli(newComment));
        dispatch(resetStates());
        setCommentText('');
    }
    
    return(
        <div className="publiDetails">
            <div className="datasUser">
                {publi && (
                    <>
                        {publi.userImage ? (
                            <img src={
                                `${imgsSaves}/user/${publi.userImage}`
                            } alt="" />
                        ) : (
                            <div className="imageDefault">
                                <BsFillPersonFill />
                            </div> 
                        )}
                    </>
                    
                )}
                <p>{publi.userName}</p>
            </div>
            <div className="moreDetails">
                <h2>{publi.title}</h2>
                <div className="imagePubli">
                    <img src={
                        `${imgsSaves}/publication/${publi.image}`
                    } alt="" className='imgPubliDetail' />
                </div>
                
                
                <div className="svgsOptions">
                    
                    <Like publi={publi} userAuth={userAuth} />
                    
                </div>
                {(success && success.includes('Like')) && <Message msg={success} isMsg='success' />}
                
                <p>{publi.description}</p>

            </div>

            {/* form comment */}
            <div className="formCreateComment">
                <form onSubmit={handleComment}>
                    <label>
                        <BsReceiptCutoff />
                        <input 
                            type="text" 
                            placeholder='Insira um comentário'
                            onChange={(e) => setCommentText(e.target.value)}
                            value={commentText || ''}    
                            required
                        />
                    </label>

                    <input type="submit" value='Comentar' />
                </form>
                {(success && success.includes('Coment')) && <Message msg={success} isMsg='success' />}

                
            </div>
            {/* comments publi */}
            <div className="commentsPubli">
                {(publi.comments && publi.comments.length > 0) ? (
                    <>
                        {publi.comments.map(publiComment => (
                            <div key={Math.random() * 10000} className='comment'>
                                <div className="commentImage">
                                    {publiComment.image ? (
                                        <img src={
                                            `${imgsSaves}/user/${publiComment.image}`
                                        } alt="" />
                                    ) : (
                                        <div className="imageDefault">
                                            <BsFillPersonFill />
                                        </div>
                                    )}
                                </div>
                                <div className="datasUserComment">
                                    <p className='userComment'>{publiComment.userName}</p>
                                    <p className='textComment'>{publiComment.comment}</p>
                                </div>
                            </div>
                        ))}
                        
                    </>
                ) : (
                    <div className="notComment">
                        <p>Essa publicação não tem comentários</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PubliDetails;