import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import DynamicForm from '../../components/DynamicForm';
import axios from 'axios';

const AddUser = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  // ambil eror dari state
  const {isError, user} = useSelector((state => state.auth));
  const [msg, setMsg] = useState("");

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

  const fields = [
      { name: 'name', label: 'Name', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Name' },
      { name: 'email', label: 'Email', type: 'email', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Email' },
      { name: 'password', label: 'Password', type: 'password', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: '******' },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: '******' },
      { name: 'user_status', label: 'Status Karyawan', type: 'radio', className: 'radio', wrapperClassName: 'field', labelClassName: 'label', radioLabelClassName: 'radio', options: [
        { value: 'magang', label: 'Magang' }, 
        { value: 'kontrak', label: 'Kontrak' },
        { value: 'tetap', label: 'Tetap' }, 
        { value: 'resign', label: 'Resign' }], 
      },
      {
          name: 'role', label: 'Role', type: 'select', className: 'select is-fullwidth', wrapperClassName: 'field', labelClassName: 'label', options: [
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' }
          ]
      },
      { name: 'nik_user', label: 'Nomor Indux Karyawan', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Nomor Induk Karyawan' },

  ];

  const saveUser = async(data) =>{
      try {
          await axios.post('http://localhost:5000/users', {
              name : data.name,
              email: data.email,
              password: data.password,
              confirmPassword: data.confirmPassword,
              role: data.role,
              user_status: data.user_status,
              nik_user: data.nik_user
          });
          navigate("/users");
      } catch (error) {
          if(error.response){
              setMsg(error.response.data.msg);
          }
      }
  }

  return (
    <Layout>
      <div>
        <h2 className="subtitle">Add New User</h2>
        <div className="card is-shadowless">
          <div className="card-content">
              <div className="content">
                  <DynamicForm
                      fields={fields}
                      onSubmit={saveUser}
                      errorMsg={msg}
                      buttonText='Simpan'
                      buttonClassName='button is-success'
                      formClassName='form-add-karyawan'
                  />
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddUser