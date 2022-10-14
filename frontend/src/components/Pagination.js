import './Pagination.css';
import { useDispatch } from 'react-redux';
import { getAllPublis, getPubliByUser } from '../slices/publiSlice';
import { useCallback, useEffect, useState } from 'react';

const Pagination = ({ allPublis, count }) => {

    const dispatch = useDispatch();
    const [qtdPags, setQtdPags] = useState(Math.ceil(count / 10));
    const limitDefault = 10;
    const [elementsRender, setElementsRender] = useState([]);

    useEffect(() => {
        setElementsRender([]);
    }, []);

    const generateOptionsPagination = useCallback(
        () => { 
            for(let i=1;i<=qtdPags;i++){
                setElementsRender(prevElements => [...prevElements, i]) 
            }
        }, [qtdPags]
    )

    useEffect(()=>{
        setQtdPags('');
        if(qtdPags >= 2){
            generateOptionsPagination()
        }
    }, [count, qtdPags, generateOptionsPagination])

    

    const changePublis = (element) => {
        if(allPublis){
            dispatch(getAllPublis(element * limitDefault));
        }else{
            dispatch(getPubliByUser(element * limitDefault));
        }
    } 

    return (
        
        <div className="pagination">
            <>
                {
                    elementsRender.map(element => (
                        
                            <div className='elementPagination' key={element} onClick={() => changePublis(Number(element))}>
                                <a href="#navAuth">
                                    {element}
                                </a>
                            </div>
                       
                        
                    ))
                } 
            </>
        </div> 
    )
}

export default Pagination;