import React, { useState }  from 'react'
import { logout } from '../../config/authSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import './Aside.css'
import { Link } from 'react-router-dom'
import Dash from '../../assets/icons/dash-white.svg'
import Articles from '../../assets/icons/articles-white.svg'
import Write from '../../assets/icons/write-white.svg'
import Drafts from '../../assets/icons/folder-drafts-white.svg'
import Danger from '../../assets/icons/danger-white.svg'
import Faq from '../../assets/icons/faq-white.svg'
import Forum from '../../assets/icons/forum.svg'
import Questions from '../../assets/icons/questions.svg'
import Logout from '../../assets/icons/logout.svg'
import Person from '../../assets/icons/person-white.svg'
import List from '../../assets/icons/list-white.svg'

export default function AsideUser() {

    const [isAsideVisible, setIsAsideVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
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
                <Link to="/dashboard/editor" className='nav-link link-router'>Nástěnka</Link>
            </li>
        </ul>

        <ul>
        <p>Články</p>
            <li className="nav-item">
                <img src={Articles} className='aside-icon' alt='img'></img>
                <Link to="/manage-posts-editor" className='nav-link link-router'>Přečíst později</Link>
            </li>
            <li className="nav-item">
                <img src={Write} className='aside-icon' alt='img'></img>
                <Link to="/write-new-post" className='nav-link link-router'>Aktivity</Link>
            </li>
                
        </ul>
        </div>
        

        <ul className='bottom'>
            <button onClick={handleLogout} className='logout-btn'><img src={Logout} className='log' alt='img'></img></button>
            <li className="nav-item">
                <Link to="/manage-posts-editor" className='nav-link link-router'><img src={Person} className='bigger-icon' alt='img'></img></Link>
            </li>
        </ul>

        </div>


       



    </nav>
    </>
  )
}
