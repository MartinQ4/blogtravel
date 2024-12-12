import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../config/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAuthenticate } from '../../../hooks/useAuthenticate';

import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authenticateUser, loading, error } = useAuthenticate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { success, user, message } = await authenticateUser(username, password);

        if (success) {
            dispatch(login({ user: user, role: user.role }));

            if (user.role.includes('admin')) {
                navigate('/dashboard/admin');
            } else if (user.role.includes('editor')) {
                navigate('/dashboard/editor');
            } else {
                navigate('/dashboard/user');
            }
        } else {
            alert(message);
        }
    };

    return (
        <main className='main-login'>
            <div className='login-background'>
                <div className='login-container'>
                    <div>
                        <h2 className='thiner'>Přihlášení</h2>
                    </div>

                    <form onSubmit={handleSubmit} className='form-login'>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className='form-input' 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className='form-input' 
                        />
                        <button type="submit" className='btn big dark' disabled={loading}>
                            {loading ? 'Loading...' : 'Přihlásit se'}
                        </button>
                    </form>

                    {error && <p className='error'>{error}</p>}

                    <div className='links'>
                        <p className='gray'>Zapomenuté heslo?</p>
                        <p className='gray'>Nemáte účet? Registrace</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
