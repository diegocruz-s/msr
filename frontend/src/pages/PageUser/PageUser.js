// style
import './PageUser.css';
// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// compopnentes
import DatasUser from '../../components/DatasUser';
import Publis from '../../components/Publis';

// redux
import { getUserById } from '../../slices/userSlice';
import { getPublisUserId } from '../../slices/publiSlice';

const PageUser = ()=>{

    const { id } = useParams();
    const dispatch = useDispatch();
    const { user: userId } = useSelector(state => state.user);
    const { publis } = useSelector(state => state.publi);

    useEffect(()=>{
        dispatch(getUserById(id));
        dispatch(getPublisUserId(id));
    }, [dispatch, id])

    return (
        <div className="pageUser">
            <DatasUser userId={userId} userToken={null} />
            <Publis publis={publis} />
        </div>
    )
}

export default PageUser;