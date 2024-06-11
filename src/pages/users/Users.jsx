import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPenClip, FaRegTrashCan} from "react-icons/fa6";

const Users = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  // ambil eror dari state
  const {isError, user} = useSelector((state => state.auth));

  useEffect(()=> {
    dispacth(getMe());
  },[dispacth]);

  // validasi
  useEffect(()=> {
    if(isError){
      navigate("/");
    }
    if(user && user.role !== "admin"){
      navigate("/dashboard")
    }
  },[isError, user, navigate]); 

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Store user ID for deletion

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data.data)
    }
    useEffect(()=>{
        fetchData();
    },[]);

    const deleteUser = async (userId) => {
      setUserIdToDelete(userId); // Set user ID for modal
      setIsModalOpen(true); // Open modal for confirmation
    };

    const handleDeleteConfirmation = async () => {
      if (userIdToDelete) {
        await axios.delete(`http://localhost:5000/users/${userIdToDelete}`);
        fetchData();
        setIsModalOpen(false); // Close modal after confirmation
        setUserIdToDelete(null); // Clear user ID after deletion
      }
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
      setUserIdToDelete(null); // Clear user ID when closing without confirmation
    };

  return (
    <Layout>
        <div>
            <h2 className="subtitle">List of Users</h2>
            <NavLink to="/users/add" className='button is-primary'>Add User</NavLink>
            <table className='table is-striped is-fullwidth '>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index)=> (
                        <tr key={user.uuid}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/users/edit/${user.uuid}`} className='mr-2'><FaPenClip/></Link>
                            <button onClick={()=> deleteUser(user.uuid)}><FaRegTrashCan/></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal for confirmation */}
            <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Confirm Delete</p>
                  <button className="delete" aria-label="close" onClick={handleModalClose}></button>
                </header>
                <section className="modal-card-body">
                  Are you sure you want to delete this user?
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-danger" onClick={handleDeleteConfirmation}>Delete</button>
                  <button className="button" onClick={handleModalClose}>Cancel</button>
                </footer>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Users;