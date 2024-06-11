import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPenClip, FaRegTrashCan} from "react-icons/fa6";

const Customers = () => {
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

  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null); // Store customer ID for deletion

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data.data)
    }
    useEffect(()=>{
        fetchData();
    },[]);

    const deleteCustomer = async (customerId) => {
      setCustomerIdToDelete(customerId); // Set customer ID for modal
      setIsModalOpen(true); // Open modal for confirmation
    };

    const handleDeleteConfirmation = async () => {
      if (customerIdToDelete) {
        await axios.delete(`http://localhost:5000/customers/${customerIdToDelete}`);
        fetchData();
        setIsModalOpen(false); // Close modal after confirmation
        setCustomerIdToDelete(null); // Clear customer ID after deletion
      }
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
      setCustomerIdToDelete(null); // Clear customer ID when closing without confirmation
    };

  return (
    <Layout>
        <div>
            <h2 className="subtitle">List of Customers</h2>
            <Link className='button is-primary mb-2' to="/customers/add">Add Customer</Link>
            <table className='table is-striped is-fullwidth '>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Pelanggan</th>
                        <th>Kode</th>
                        <th>Kecamatan / Kabupaten</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index)=> (
                        <tr key={customer.uuid}>
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        <td>{customer.kode_customer}</td>
                        <td>{customer.kecamatan} - {customer.kabupaten}</td>
                        <td>{customer.customer_status}</td>
                        <td>
                            <Link to={`/customers/edit/${customer.uuid}`} className='mr-2'><FaPenClip/></Link>
                            <button onClick={()=> deleteCustomer(customer.uuid)}><FaRegTrashCan/></button>
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
                  Are you sure you want to delete this customer?
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

export default Customers;