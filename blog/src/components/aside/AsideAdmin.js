import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout, switchRole } from '../../config/authSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Aside.css'
import Dash from '../../assets/icons/dash-white.svg'
import Articles from '../../assets/icons/articles-white.svg'
import Danger from '../../assets/icons/danger-white.svg'
import Logout from '../../assets/icons/logout.svg'
import Person from '../../assets/icons/person-white.svg'
import List from '../../assets/icons/list-white.svg'


export default function AsideA() {
    const [isAsideVisible, setIsAsideVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
      };
    
      const handleSwitchRole = () => {
        dispatch(switchRole());
        navigate('/dashboard/user');
      };


  return (
    <>
     <button className="menu-btn"
    onClick={() => setIsAsideVisible((prev) => !prev)}>
                <h2>TravelBlog</h2>
                <img src={isAsideVisible ? List : List} alt="Menu" />
    </button>

    <nav className={`nav-aside ${isAsideVisible ? 'visible' : ''}`}>
    <Link to="/" className='link-router' href="#"><h1 className='logo'>TravelBlog</h1></Link>

    <div className='nav-inside'>
        <div>
    <ul>
        <p>Přehled</p>
        <li>
        <img src={Dash} className='aside-icon' alt='img'></img>
            <Link to="/dashboard/admin" className='nav-link link-router'>Nástěnka</Link>
        </li>
    </ul>

    <ul>
    <p>Články</p>
        <li className="nav-item">
            <img src={Articles} className='aside-icon' alt='img'></img>
            <Link to="/manage-posts-admin" className='nav-link link-router'>Články</Link>
        </li>
        <li className="nav-item">
            <img src={Danger} className='aside-icon' alt='img'></img>
            <Link to="/manage-posts-admin" className='nav-link link-router'>Nahlášené</Link>
        </li>
            
    </ul>

    <ul>
    <p>Uživatelé</p>
        <li className="nav-item">
            <img src={Person} className='aside-icon' alt='img'></img>
            <Link to="/manage-users" className='nav-link link-router'>Seznam</Link>
        </li> 
    </ul>
    </div>
    

    <ul className='bottom'>
        <div className='top-two'>
            <button onClick={handleLogout} className='logout-btn'><img src={Logout} className='log' alt='img'></img></button>
            <li className="nav-item">
                <Link to="/manage-posts-editor" className='nav-link link-router'><img src={Person} className='bigger-icon' alt='img'></img></Link>
            </li>
        </div>
        <div>
            {role.includes('user') && <button onClick={handleSwitchRole} className='btn-switch'>Uživatel</button>}
        </div>
    </ul>

    </div>


   



</nav>

</>

  )
}
