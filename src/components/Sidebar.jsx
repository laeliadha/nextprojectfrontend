import React from 'react';
import {NavLink} from "react-router-dom";
import {IoPerson, IoPricetag, IoHome, IoSettings} from "react-icons/io5";
import {useSelector } from 'react-redux';

const Sidebar = () => {
    const {user} = useSelector((state) => state.auth);

  return (
    <div>
        <aside className="menu has-shadow pl-2">
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li><NavLink to="/dashboard"><IoHome/> Dashboard</NavLink></li>
                <li><NavLink to="/tool"><IoSettings/> Tool</NavLink></li>
                <li><NavLink to="/products"><IoPricetag/> Product</NavLink></li>
            </ul> 
            {/* user admin */}
            {user && user.role === "admin" && (
                <>
                    <p className="menu-label">Admin</p>
                    <ul className="menu-list">
                        <li><NavLink to="/users"><IoPerson/> User</NavLink></li>
                    </ul>
                </>
            )}
        </aside>
    </div>
  )
}

export default Sidebar