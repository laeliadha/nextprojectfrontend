import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import DynamicForm from '../components/DynamicForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [initialData, setInitialData] = useState({});
  const [msg, setMsg] = useState("");

  const fields = [
    { name: 'name', label: 'Name', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Name', wrapperInputClassName : 'control' },
    { name: 'price', label: 'Price', type: 'number', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Price', wrapperInputClassName : 'control' }
  ];

  useEffect(() => {
    // funcition ambil data product
    const fetchData = async () => {
      try {
        // memastika user sudah login
        await dispatch(getMe()).unwrap();
        // mulai ambil data
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setInitialData({
          name: response.data.name,
          price: response.data.price
        });
      } catch (error) {
        // eror pengambilan data
        if (error.response) {
          setMsg(error.response.data.msg);
        }
        // eror belum login
        if (isError) {
          navigate("/");
        }
      }
    };

    fetchData();
  }, [dispatch, id, isError, navigate]);

  const updateProduct = async (data) => {
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, data);
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      <div>
        <h1 className='title'>Product</h1>
        <h2 className="subtitle">Edit Product</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <DynamicForm
                fields={fields}
                initialData={initialData}
                onSubmit={updateProduct}
                errorMsg={msg}
                buttonText="Update"
                buttonClassName="button is-success"
                formClassName="form-edit-product"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;