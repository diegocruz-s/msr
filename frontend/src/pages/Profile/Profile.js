import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserToken, updateUser, resetStates } from '../../slices/userSlice';
import { BsImage, BsPencilSquare, BsFillEnvelopeFill, BsFillPersonFill, BsCheckCircle, BsFillCheckCircleFill } from 'react-icons/bs';
import { imgsSaves } from '../../services/userService';
import Message from '../../components/Message';
import './Profile.css';

const Profile = ()=>{

    const dispatch = useDispatch();

    const { user, loading, error, success } = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');

    const [preview, setPreview] = useState('');
    const [userImage, setUserImage] = useState('');

    const [msgSucess, setMsgSuccess] = useState(false);

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setDescription(user.description);
            if(user.image){
                setUserImage(user.image);
            }
        }
    }, [user]);

    useEffect(()=>{
        dispatch(getUserToken());
    }, [dispatch]);

    const handleFile = (e)=>{
        if(e.target.files){
            setPreview(e.target.files[0])
            setUserImage(e.target.files[0]);
        }
    }

    const handleUpdate = (e)=>{
        e.preventDefault();

        dispatch(resetStates());

        const updatedUser = {
            name,
        };

        if(description){
            updatedUser.description = description;
        }

        if(userImage){
            updatedUser.image = userImage
        }

        if(password){
            updatedUser.password = password;
        }

        const formData = new FormData();

        Object.keys(updatedUser).map(nameProp => (
            formData.append(nameProp, updatedUser[nameProp])
        ))

        dispatch(updateUser(formData));
        setMsgSuccess(true);

    }

    return(
        <div>
            {user && (

                <form onSubmit={handleUpdate} className='formEditUser'>
                    {(preview || user.image) ? (
                        <img src={preview ? 
                            URL.createObjectURL(preview) : 
                            `${imgsSaves}/user/${user.image}`} alt={user.name}
                            className='imgUser'    
                        />
                    ) : ( 
                        <div className='noImgProfile'>
                            <p>Insira uma foto</p>
                        </div>
                    )}

                    <label>
                        <BsImage />
                        <input 
                            type="file" 
                            onChange={handleFile}
                        />
                    </label>
                    <label>
                        <BsFillPersonFill />
                        <input 
                            type="text" 
                            placeholder='Nome'
                            onChange={(e) => setName(e.target.value)} 
                            value={name || ''} 
                        />
                    </label>
                    <label>
                        <BsFillEnvelopeFill />
                        <input 
                            type="email" 
                            placeholder='Email'
                            value={email || ''}
                            disabled 
                        />
                    </label>
                    <label>
                        {password.length > 6 ? (
                            <BsFillCheckCircleFill />
                        ) : (
                            <BsCheckCircle />
                        )}
                        <input 
                            type="password" 
                            placeholder='Senha'
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password || ''} 
                        />
                    </label>
                    <label>
                        <BsPencilSquare />
                        <input 
                            type="text" 
                            placeholder='Descrição'
                            onChange={(e) => setDescription(e.target.value)} 
                            value={description || ''} 
                        />
                    </label>


                    {loading ? (
                        <input type="submit" value="Aguarde..." disabled />
                    ) : (
                        <input type="submit" value="Atualizar" />
                    )}                            
                </form>
            )}
            {error && <Message msg={error} isMsg='error' />}
            {(success && msgSucess) && (
                <Message msg={success} isMsg='success' />
            )}
        </div>
    )
}

export default Profile;