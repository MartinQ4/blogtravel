import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../config/authSlice';
import { useNavigate } from 'react-router-dom';

import './Login.css'


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/users');
            const users = await response.json();

            const user = users.find((user) => user.username === username && user.password === password);

            if (user) {
                dispatch(login({ user: user, role: user.role }));
            
              if (user.role.includes('admin')) {
                navigate('/dashboard/admin');
              } else if (user.role.includes('editor')) {
                navigate('/dashboard/editor');
              } else {
                navigate('/dashboard/user');
              }
              } 
            else {
              alert('Invalid credentials');
      }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
       
            <main className='main-login'>
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
                        <button type="submit" className='btn big dark'>Přihlásit se</button>
                    </form>

                    <div className='links'>
                        <p className='gray'>Zapomenuté heslo?</p>
                        <p className='gray'>Nemáte účtet? Registrace</p>
                    </div>
                </div>
            </main>
      
       
    );
}


