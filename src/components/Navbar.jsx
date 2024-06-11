import React from 'react'
import {NavLink} from "react-router-dom";
import logo from "../logo.png";
import { IoAppsSharp } from 'react-icons/io5';

const Navbar = ({ toggleAside }) => {

  return (
    <nav className="navbar is-light is-fixed-top">
      <div className="navbar-brand">
        <NavLink 
          role="button" 
          className="navbar-item icon-only" 
          onClick={toggleAside}
        >
          <span className="icon">
            <IoAppsSharp/>
          </span>
        </NavLink>
        <NavLink to='/dashboard' className="navbar-item">
         <img 
            src={logo}
            width='112' 
            height='28'
            alt='logo'/>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar