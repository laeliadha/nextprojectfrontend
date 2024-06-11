import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import { FaPenClip, FaRegTrashCan} from "react-icons/fa6";
import DynamicForm from '../../components/DynamicForm';

const MasterTransactions = () => {
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

  const [msg, setMsg] = useState("");
  const [masterTransactions, setMasterTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isModalFormOpen, setIsModalFormOpen] = useState(false); // State to manage modal visibility
  const [editTransactionData, setEditTransactionData] = useState(null);
  const [masterTransactionsToDelete, setMasterTransactionsToDelete] = useState(null); // Store customer ID for deletion

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/master_transactions');
        setMasterTransactions(response.data)
    }
    useEffect(()=>{
        fetchData();
    },[]);

    const addMasterTransaction =  () => {
        setEditTransactionData(null); // Reset edit data
        setIsModalFormOpen(true); // Open modal for confirmation
    };

    const editMasterTransaction = (masterTransactionId) => {
        setEditTransactionData(masterTransactionId); // Set data for editing
        setIsModalFormOpen(true); // Open modal for editing
    };

    const deleteMasterTransaction = async (masterTransactionId) => {
      setMasterTransactionsToDelete(masterTransactionId); // Set customer ID for modal
      setIsModalOpen(true); // Open modal for confirmation
    };

    const handleDeleteConfirmation = async () => {
      if (masterTransactionsToDelete) {
        await axios.delete(`http://localhost:5000/master_transactions/${masterTransactionsToDelete}`);
        fetchData();
        setIsModalOpen(false); // Close modal after confirmation
        setMasterTransactionsToDelete(null); // Clear customer ID after deletion
      }
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
      setIsModalFormOpen(false)
      setMasterTransactionsToDelete(null); // Clear customer ID when closing without confirmation
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Name' , wrapperInputClassName:'control'},
        { name: 'type', label: 'Tipe Transaksi', type: 'radio', className: 'radio', wrapperClassName: 'field', labelClassName: 'label', radioLabelClassName: 'radio', wrapperInputClassName:'control', options: [
          { value: 'in', label: 'Masuk' }, 
          { value: 'out', label: 'Keluar' }], 
        },
        { name: 'text', label: 'Keterangan Transaksi', type: 'textarea', className: 'textarea', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Keterangan transaksi', wrapperInputClassName:'control' },
  
    ];
  
    const saveTransaction = async(data) =>{
        try {
            if (editTransactionData) {
                await axios.patch(`http://localhost:5000/master_transactions/${editTransactionData.uuid}`, {
                  name: data.name,
                  type: data.type,
                  text: data.text
                });
            } else {
                await axios.post('http://localhost:5000/master_transactions', {
                    name: data.name,
                    type: data.type,
                    text: data.text
                });
            }
            fetchData();
            handleModalClose();
            // window.location.reload();
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <Layout>
        <div>
            <h2 className="subtitle">List of Master Transactions</h2>
            <button className='button is-primary mb-2' onClick={addMasterTransaction}>Add Data Master</button>
            <table className='table is-striped is-fullwidth '>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Keterangan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {masterTransactions.map((masterTransaction, index)=> (
                        <tr key={masterTransaction.uuid}>
                        <td>{index + 1}</td>
                        <td>{masterTransaction.name}</td>
                        <td>
                            <span className={masterTransaction.type === 'in' ? 'tag is-link' : 'tag is-danger'} >{masterTransaction.type}</span></td>
                        <td>{masterTransaction.text}</td>
                        <td>
                        <button className='mr-2' onClick={() => editMasterTransaction(masterTransaction)}><FaPenClip /></button>
                            <button onClick={()=> deleteMasterTransaction(masterTransaction.uuid)}><FaRegTrashCan/></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal for confirmation delete*/}
            <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Confirm Delete</p>
                  <button className="delete" aria-label="close" onClick={handleModalClose}></button>
                </header>
                <section className="modal-card-body">
                  Are you sure you want to delete this data?
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-danger mr-2" onClick={handleDeleteConfirmation}>Delete</button>
                  <button className="button" onClick={handleModalClose}>Cancel</button>
                </footer>
              </div>
            </div>
            {/* modal for add data */}
            <div className={`modal ${isModalFormOpen ? 'is-active' : ''}`}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">
                    {editTransactionData ? 'Edit Master Transaction' : 'Add Master Transaction'}
                  </p>
                  <button className="delete" aria-label="close" onClick={handleModalClose}></button>
                </header>
                <section className="modal-card-body">
                    <DynamicForm
                      fields={fields}
                      onSubmit={saveTransaction}
                      errorMsg={msg}
                      buttonText='Simpan'
                      buttonClassName='button is-success'
                      formClassName='form-add-master-transaction'
                      initialData={editTransactionData || {}}
                  />
                </section>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default MasterTransactions;