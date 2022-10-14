import './Auth.css';
import { useEffect, useState } from "react";
import { BsFillHouseFill, BsFillEnvelopeFill, BsLockFill, BsFillPersonFill, BsCheckCircle, BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { register, login, resetStates } from '../../slices/authSlice';
import Message from '../../components/Message';

const Auth = () => {

    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(()=>{
        dispatch(resetStates());
    }, [dispatch])

    const [formLogin, setFormLogin] = useState(true);
    const [formRegister, setFormRegister] = useState(false);

    // States login
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    // States register
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const showFormLogin = ()=>{
        setFormLogin(true);
        setFormRegister(false);
    }

    const showFormRegister = ()=>{
        setFormLogin(false);
        setFormRegister(true);
    }

    const handleLogin = (e)=>{
        e.preventDefault();

        const user = {
            email: emailLogin, password: passwordLogin
        }

        dispatch(login(user));

    }

    const handleRegister = (e)=>{
        e.preventDefault();

        const user = {
            name, email, password, confirmPassword
        }

        dispatch(register(user));
        
    }

    return(
        <section className="divAuth">
            <Link to='/' className='goHome'>
                <BsFillHouseFill />
            </Link>

            <div className="optionsForm">
                <button onClick={showFormLogin} className={`${formLogin ? 'showForm' : ''} titleLogin`}>Entrar</button>
                <button onClick={showFormRegister} className={`${formRegister ? 'showForm' : ''} titleLogin`}>Registrar</button>
            </div>

            {formLogin ? (<h3>Login</h3>) : (<h3>Cadastrar</h3>)}

            {formLogin ? (
                <div className="allForms formLogin">
                    <form onSubmit={handleLogin}>
                        <label>
                            <BsFillEnvelopeFill /> 
                            <input 
                                required
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmailLogin(e.target.value) } 
                                value={emailLogin || ''} 
                            />
                        </label>
                        <label>
                            <BsLockFill /> 
                            <input 
                                required
                                type="password" 
                                placeholder="Senha" 
                                onChange={(e) => setPasswordLogin(e.target.value) } 
                                value={passwordLogin || ''} 
                            />
                        </label>

                        {loading ? (
                            <input type="submit" value='Aguarde...' disabled />
                        ) : (
                            <input type="submit" value='Entrar' />
                        )}
                        
                    </form>
                </div>
            ) : (
            <div className="allForms formRegister">
                <form onSubmit={handleRegister}>

                    <label>
                        <BsFillPersonFill />
                        <input 
                            required
                            type="name" 
                            placeholder="Nome"
                            onChange={(e) => setName(e.target.value) } 
                            value={name || ''} 
                        />
                    </label>
                    <label>
                        <BsFillEnvelopeFill /> 
                        <input 
                            required
                            type="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value) } 
                            value={email || ''} 
                        />
                    </label>
                    <label>
                        <BsLockFill /> 
                        <input 
                            required
                            type="password" 
                            placeholder="Senha" 
                            onChange={(e) => setPassword(e.target.value) } 
                            value={password || ''} 
                        />
                    </label>
                    <label>
                        {password !== '' && password === confirmPassword ? (
                            <BsFillCheckCircleFill />
                        ) : (
                            <BsCheckCircle />
                        )}
                        <input 
                            required
                            type="password" 
                            placeholder="Confirme sua senha"  
                            onChange={(e) => setConfirmPassword(e.target.value) } 
                            value={confirmPassword || ''} 
                        />
                    </label>

                    {loading ? (
                            <input type="submit" value='Aguarde...' disabled />
                        ) : (
                            <input type="submit" value='Registrar' />
                        )}
                                    
                </form>

            </div>
        )}

            {error && <Message msg={error} isMsg='error' />}

        </section>
    )
};

export default Auth;