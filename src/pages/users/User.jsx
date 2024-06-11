import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import LoadingPage from '../../components/LoadingPage';

const UserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [msg, setMsg] = useState("");

  const { isError, user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMe());

        const { data } = await axios.get(`http://localhost:5000/users/${id}`);
        setUserData(data);
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

  if (!userData) {
    return <LoadingPage/>;
  }

  return (
    <Layout>
      <div>
        <h2 className='subtitle'>User Details</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Role:</strong> {userData.role}</p>
              <p><strong>Tempat Lahir:</strong> {userData.born_place}</p>
              <p><strong>Tanggal Lahir:</strong> {userData.birth_date}</p>
              <p><strong>NIK:</strong> {userData.nik_ktp}</p>
              <p><strong>Alamat:</strong> {userData.alamat}</p>
              <p><strong>RT / RW:</strong> {userData.rt_rw}</p>
              <p><strong>Kelurahan / Desa:</strong> {userData.kelurahan_desa}</p>
              <p><strong>Kecamatan:</strong> {userData.kecamatan}</p>
              <p><strong>Kabupaten:</strong> {userData.kabupaten}</p>
              <p><strong>Provinsi:</strong> {userData.profinsi}</p>
              <p><strong>Agama:</strong> {userData.agama}</p>
              <p><strong>Golongan Darah:</strong> {userData.golongan_darah}</p>
              <p><strong>SIM A:</strong> {userData.sim_a}</p>
              <p><strong>SIM B:</strong> {userData.sim_b}</p>
              <p><strong>SIM C:</strong> {userData.sim_c}</p>
              <p><strong>Status Karyawan:</strong> {userData.user_status}</p>
              <p><strong>Tanggal Gabung:</strong> {userData.join_date}</p>
              <p><strong>Tanggal Keluar:</strong> {userData.end_date}</p>
            </div>
          </div>
        </div>
        {msg && <p className="help is-danger">{msg}</p>}
      </div>
    </Layout>
  );
};

export default UserDetail;