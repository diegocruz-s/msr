import './Dashboard.css';

// redux
import { getUserToken } from '../../slices/userSlice';
import { countPublisPag, createPubli, deletePubli, getPubliByUser, resetStates, updatedPubli } from '../../slices/publiSlice';
import { imgsSaves } from '../../services/userService';

// hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';

// components
import Message from '../../components/Message';
import DatasUser from '../../components/DatasUser';
import Publis from '../../components/Publis';
import Pagination from '../../components/Pagination';

const Dashboard = ()=>{

    const dispatch = useDispatch();

    // user logged ande user token
    const { user: userAuth,  } = useSelector(state => state.auth);
    const { user: userToken, loading: loadingToken } = useSelector(state => state.user);

    // states reducers
    const { publis, countPublis, loading: loadingPublis, error: errorPublis, success: successPublis } = useSelector(state => state.publi);

    // state new publi
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const refFormCreate = useRef();

    // states edit form
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImage, setEditImage] = useState('');
    const [idPubli, setIdPubli] = useState('');
    const refFormEdit = useRef();

    useEffect(()=>{
        dispatch(countPublisPag(false));  
    }, [dispatch])

    useEffect(()=>{
        dispatch(resetStates());
        dispatch(getUserToken());
        dispatch(getPubliByUser(null));
        dispatch(countPublisPag(false));  
    }, [dispatch])

    const handleFile = (e)=>{
        setImage(e.target.files[0]);
    }
    const handleDelete = (id)=>{
        dispatch(deletePubli(id));
        dispatch(resetStates());
    }

    const handleCreatePubli = (e) => {
        e.preventDefault();

        const newPubli = {
            title: title, description: description, image: image
        }

        const formData = new FormData();

        Object.keys(newPubli).forEach((key)=>(
            formData.append(key, newPubli[key])
        ))

        dispatch(createPubli(formData));
        dispatch(resetStates());

        setTitle('');
        setDescription('');
        setImage('');

    }

    const handleEdit = (publi)=>{
        refFormEdit.current.classList.remove('hideForm');
        refFormCreate.current.classList.add('hideForm');

        setEditTitle(publi.title);
        setEditDescription(publi.description);
        setEditImage(publi.image);
        setIdPubli(publi._id);
    }

    const handleShowCreate = ()=>{
        refFormEdit.current.classList.add('hideForm');
        refFormCreate.current.classList.remove('hideForm');
    }

    const handleUpdatePubli = (e)=>{
        e.preventDefault();

        const publiUpdate = {
            title: editTitle, 
            description: editDescription,
            id: idPubli
        }

        dispatch(updatedPubli(publiUpdate));
        handleShowCreate();
    }

    return(
        <section className="dashboard">
            {(userAuth && userToken) && (
                <div className="all">
                    <div className="userDatas">
                        {loadingToken ? (
                            <p>Carregando usuário...</p>
                        ) : (
                            <div className="infosUser">

                                <DatasUser userToken={userToken} userId={null} />
                            
                            </div>
                        )}
                    </div>
                    

                    <div id="form">
                        
                        {userToken._id === userAuth._id && (
                            <>
                                <form ref={refFormCreate} className='formPubli' onSubmit={handleCreatePubli}>
                                    <label>
                                        <input 
                                            required
                                            type="text" 
                                            name='title'
                                            placeholder="Título" 
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title || ''}
                                        />
                                    </label>
                                    <label>
                                        <input 
                                            required
                                            type="text"
                                            name='description'
                                            placeholder="Descrição" 
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description || ''}
                                        />
                                    </label>
                                    <label htmlFor='files'>                                    
                                        <input 
                                            required
                                            type="file" 
                                            name='images'
                                            onChange={handleFile}
                                        />
                                    </label>
                                    {loadingPublis ? (
                                        <input type="submit" value='Aguarde...' disabled />
                                    ) : (
                                        <input type="submit" value='Criar' />
                                    )}
                                </form>
                                
                                <form ref={refFormEdit} className='formEdit hideForm' onSubmit={handleUpdatePubli}>
                                    <img src={
                                        editImage ? (`${imgsSaves}/publication/${editImage}`) : ('')
                                    } alt="" />
                                    <label>
                                        <input 
                                            type="text" 
                                            placeholder='Novo título'
                                            onChange={(e) => setEditTitle(e.target.value)} 
                                            value={editTitle || ''}
                                        />
                                    </label>

                                    <label>
                                        <input 
                                            type="text" 
                                            placeholder='Nova descrição'
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            value={editDescription || ''} 
                                        />
                                    </label>

                                    <input type="submit" value='Atualizar' />
                                    <button type='button' onClick={handleShowCreate}>X</button>
                                </form>
                                
                            </>
                        )}
                    </div>

                    <div className="titlePublis">
                        <h3>Minhas publicações</h3>
                    </div>

                    {(publis && publis.length > 0) ? (
                        <>
                            {errorPublis && <Message msg={errorPublis} isMsg='error' />}
                            {successPublis && <Message msg={successPublis} isMsg='success' />}

                            <Publis 
                                publis={publis} 
                                userToken={userToken} 
                                userAuth={userAuth} 
                                handleEdit={handleEdit}
                                handleDelete={handleDelete} 
                            />
                        </>
                    ): (
                        <h3>Sem publicações...</h3>
                    )}

                </div>
            )}
            {(countPublis && countPublis > 10) && (
                <Pagination allPublis={false} count={countPublis} />
            )}
        </section>
    )
}

export default Dashboard;