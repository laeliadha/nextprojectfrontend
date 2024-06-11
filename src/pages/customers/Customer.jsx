import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import LoadingPage from '../../components/LoadingPage';

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [msg, setMsg] = useState("");

  const { isError, user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMe());

        const { data } = await axios.get(`http://localhost:5000/customers/${id}`);
        setCustomer(data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    fetchData();

    if (isError) {
      navigate("/");
    } else if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [dispatch, id, isError, user, navigate]);

  if (!customer) {
    return <LoadingPage/>;
  }

  return (
    <Layout>
      <div>
        <h2 className='subtitle'>Customer Details</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <p><strong>Kode:</strong> {customer.kode_customer}</p>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Alamat:</strong> {customer.alamat}</p>
              <p><strong>RT / RW:</strong> {customer.rt_rw}</p>
              <p><strong>Kelurahan / Desa:</strong> {customer.kelurahan_desa}</p>
              <p><strong>Kecamatan:</strong> {customer.kecamatan}</p>
              <p><strong>Kabupaten:</strong> {customer.kabupaten}</p>
              <p><strong>Provinsi:</strong> {customer.profinsi}</p>
              <p><strong>No Hp:</strong> {customer.no_hp}</p>
              <p><strong>Status:</strong> {customer.customer_status}</p>
            </div>
          </div>
        </div>
        {msg && <p className="help is-danger">{msg}</p>}
      </div>
    </Layout>
  );
};

export default CustomerDetail;