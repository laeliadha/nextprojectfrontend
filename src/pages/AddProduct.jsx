import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import DynamicForm from '../components/DynamicForm';

const AddProduct = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  // ambil eror dari state
  const {isError} = useSelector((state => state.auth));

  useEffect(()=> {
    dispacth(getMe());
  },[dispacth]);

  // validasi
  useEffect(()=> {
    if(isError){
      navigate("/");
    }
  },[isError, navigate]);

  // form
  const [msg, setMsg] = useState("");

  const fields = [
      { name: 'name', label: 'Name', type: 'text', className : 'input', wrapperClassName : 'field', labelClassName: 'label', placeholder: 'Name', wrapperInputClassName : 'control'},
      { name: 'price', label: 'Price', type: 'number', className : 'input', wrapperClassName : 'field',labelClassName: 'label', placeholder: 'Price', wrapperInputClassName : 'control'}
  ];

  const saveProduct = async(data) =>{
      try {
          await axios.post('http://localhost:5000/products', {
              name : data.name,
              price: data.price
          });
          navigate("/products");
      } catch (error) {
          if(error.response){
              setMsg(error.response.data.msg);
          }
      }
  }

  return (
    <Layout>
        <div>
          <h1 className='title'>Product</h1>
          <h2 className="subtitle">Add New Product</h2>
          <div className="card is-shadowless">
              <div className="card-content">
                  <div className="content">
                      <DynamicForm
                        fields={fields}
                        onSubmit={saveProduct}
                        errorMsg={msg}
                        buttonText="Simpan"
                        buttonClassName="button is-success"
                        formClassName="form-add-product"
                      />
                  </div>
              </div>
          </div>
        </div>
    </Layout>
  )
}

export default AddProduct