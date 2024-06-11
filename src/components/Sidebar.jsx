import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {IoPerson} from "react-icons/io5";
import {useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ isActive }) => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  // const {user} = useSelector((state) => state.auth);
  const logout = () =>{
      dispacth(LogOut());
      dispacth(reset());
      navigate("/");
  }
  const {user} = useSelector((state) => state.auth);

  return (
    <aside className={`menu aside-menu ${isActive ? 'is-active' : ''}`}>
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      </ul>
      {user && user.role === "admin" && (
            <>
                <p className="menu-label">Admin</p>
                <ul className="menu-list">
                    <li><NavLink to="/users"><IoPerson/> User</NavLink></li>
                    <li><NavLink to="/customers"><IoPerson/> Customer</NavLink></li>
                    <li><NavLink to="/master_transactions"><IoPerson/> Master Transaksi</NavLink></li>
                </ul>
            </>
      )}
      <p className="menu-label">General</p>
      <ul>
        <li><button onClick={logout} className='button is-fullwidth is-danger'>Logout</button></li>
      </ul>
    </aside>
  )
}

export default Sidebar