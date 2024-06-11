import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import DynamicForm from '../../components/DynamicForm';
import axios from 'axios';

const AddCustomer = () => {
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
      { name: 'kode_customer', label: 'Kode Customer', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Kode Customer' },
      { name: 'name', label: 'Name', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Name' },
      { name: 'alamat', label: 'Alamat', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Alamat' },
      { name: 'rt_rw', label: 'RT / RW', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'RT / RW' },
      { name: 'kelurahan_desa', label: 'Kelurahan / Desa', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Kelurahan / Desa' },
      { name: 'kecamatan', label: 'Kecamatan', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Kecamatan' },
      { name: 'kabupaten', label: 'Kabupaten', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Kabupaten' },
      { name: 'profinsi', label: 'Profinsi', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Profinsi' },
      { name: 'no_hp', label: 'No HP', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'No HP' },
      {
          name: 'customer_status', label: 'Status', type: 'select', className: 'select is-fullwidth', wrapperClassName: 'field', labelClassName: 'label', options: [
            { value: 'active', label: 'Aktif' },
            { value: 'inactive', label: 'Tidak Aktif' },
            { value: 'blacklist', label: 'Blacklist' }
          ]
      }
  ];

  const saveCustomer = async(data) =>{
      try {
          await axios.post('http://localhost:5000/customers', {
              kode_customer : data.kode_customer,
              name: data.name,
              alamat: data.alamat,
              rt_rw: data.rt_rw,
              kelurahan_desa: data.kelurahan_desa,
              kecamatan: data.kecamatan,
              kabupaten: data.kabupaten,
              profinsi: data.profinsi,
              no_hp: data.no_hp,
              customer_status: data.customer_status
          });
          navigate("/customers");
      } catch (error) {
          if(error.response){
              setMsg(error.response.data.msg);
          }
      }
  }

  return (
    <Layout>
      <div>
        <h2 className="subtitle">Add New Customer</h2>
        <div className="card is-shadowless">
          <div className="card-content">
              <div className="content">
                  <DynamicForm
                      fields={fields}
                      onSubmit={saveCustomer}
                      errorMsg={msg}
                      buttonText='Simpan'
                      buttonClassName='button is-success'
                      formClassName='form-add-customer'
                  />
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddCustomer