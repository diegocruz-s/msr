import './Home.css';
import { useEffect } from 'react';
import { countPublisPag, getAllPublis, resetStates } from '../../slices/publiSlice';
import { useSelector, useDispatch } from 'react-redux'
import Publi from '../../components/Publi';
import Pagination from '../../components/Pagination';

const Home = ()=>{

    const dispatch = useDispatch();
    const { publis, countPublis } = useSelector(state => state.publi);

    useEffect(()=>{
        dispatch(countPublisPag(true));
    }, [dispatch])

    useEffect(() => {
        dispatch(resetStates());
        dispatch(getAllPublis(null));
        dispatch(countPublisPag(true));
    }, [dispatch])

    return(

        <div className="home">            
            
            {(publis && publis.length > 0) ? (
                <div className="allPublis">
                    
                    {publis.map(publi => (
                        <div key={publi._id}>
                            <Publi publi={publi} />
                        </div>
                    ))}

                    {(countPublis && countPublis > 10) &&(
                        <Pagination allPublis={true} count={countPublis} />
                    )}

                </div>
            ) : (
                <p>Não temos nenhuma publicação!</p>
            ) } 
            
        </div>

        
    )
}

export default Home;