import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";
import listIcon from "../../assets/icons/list.svg"
import personGreenUnfill from "../../assets/icons/person.svg"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">

      <div>
        <Link to="/" className='link-router' href="#"><h1 className='logo'>TravelBlog</h1></Link>
      </div>
    
    
      <button className=' navbar-toggler hamburger-button' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <img src={listIcon} alt="Menu" className='img-hamburger-icon'/>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          

          <li className="nav-item">
            <Link to="/posts" className='nav-link link-router'>O aplikaci</Link>
          </li>

          <li className="nav-item">
            <Link to="/posts" className='nav-link link-router'>Posty</Link>
          </li>

          <li className="nav-item">
            <Link to="/posts" className='nav-link link-router'>Naši editoři</Link>
          </li>

      
        </ul>

        <div className="ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={personGreenUnfill} alt="Menu" className='img-person-icon'/>

              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                
                <Link to="/login" className='link-router custom-nav-item'><p>Přihlášení</p></Link>
                <Link to="/login" className='link-router custom-nav-item'><p>Registrace</p></Link>
              </ul>
            </li>
        </div>
      
      </div>
   

          
    </div>
  </nav>
  )
}
