import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import DynamicForm from '../../components/DynamicForm';

const EditCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialData, setInitialData] = useState({});
    const [msg, setMsg] = useState("");
  
    const { isError, user } = useSelector(state => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/customers/${id}`);
          setInitialData(data);
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };
      fetchData();
    }, [id]);
  
    useEffect(() => {
      if (isError) {
        navigate("/");
      } else if (user && user.role !== "admin") {
        navigate("/dashboard");
      }
    }, [isError, user, navigate]);
  
    const updateCustomer = async (data) => {
      try {
        await axios.patch(`http://localhost:5000/customers/${id}`, data);
        navigate("/customers");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

  const fields = [
    { name: 'kode_customer', label: 'Kode Customer', type: 'text', placeholder: 'Kode Customer' },
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Name' },
    { name: 'alamat', label: 'Alamat', type: 'text', placeholder: 'Alamat' },
    { name: 'rt_rw', label: 'RT / RW', type: 'text', placeholder: "RT / RW" },
    { name: 'kelurahan_desa', label: 'Kelurahan / Desa', type: 'text', placeholder: 'Kelurahan / Desa' },
    { name: 'kecamatan', label: 'Kecamatan', type: 'text', placeholder: 'Kecamatan' },
    { name: 'kabupaten', label: 'Kabupaten', type: 'text', placeholder: 'Kabupaten' },
    { name: 'profinsi', label: 'Profinsi', type: 'text', placeholder: 'Profinsi' },
    { name: 'no_hp', label: 'No HP', type: 'text', placeholder: 'No HP' },
    {
      name: 'customer_status', label: 'Status', type: 'select', options: [
        { value: 'active', label: 'Aktif' },
        { value: 'inactive', label: 'Tidak Aktif' },
        { value: 'blacklist', label: 'Blacklist' },
      ]
    }
  ].map(field => ({
    ...field,
    className: field.type === 'select' ? 'select is-fullwidth' : 'input',
    wrapperClassName: 'field',
    labelClassName: 'label',
    radioLabelClassName: field.type === 'radio' ? 'radio' : undefined
  }));

  return (
    <Layout>
      <div>
        <h2 className="subtitle">Update Customer</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <DynamicForm
                fields={fields}
                initialData={initialData}
                onSubmit={updateCustomer}
                errorMsg={msg}
                buttonText="Update"
                buttonClassName="button is-success"
                formClassName="form-edit-user"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditCustomer;