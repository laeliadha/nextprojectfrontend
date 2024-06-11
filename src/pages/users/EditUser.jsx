import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import axios from 'axios';
import DynamicForm from '../../components/DynamicForm';

const EditUser = () => {
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
    const getUserById = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/users/${id}`);
        setInitialData(data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    } else if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const updateUser = async (data) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, data);
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '******' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '******' },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
      ]
    },
    { name: 'born_place', label: 'Tempat Lahir', type: 'text', placeholder: 'Tempat Lahir' },
    { name: 'birth_date', label: 'Tanggal Lahir', type: 'text', placeholder: 'Tanggal lahir' },
    { name: 'nik_ktp', label: 'NIK', type: 'text', placeholder: 'NIK' },
    { name: 'alamat', label: 'Alamat', type: 'text', placeholder: 'Alamat' },
    { name: 'rt_rw', label: 'RT / RW', type: 'text', placeholder: 'RT / RW' },
    { name: 'kelurahan_desa', label: 'Kelurahan / Desa', type: 'text', placeholder: 'Kelurahan / Desa' },
    { name: 'kecamatan', label: 'Kecamatan', type: 'text', placeholder: 'Kecamatan' },
    { name: 'kabupaten', label: 'Kabupaten', type: 'text', placeholder: 'Kabupaten' },
    { name: 'profinsi', label: 'Profinsi', type: 'text', placeholder: 'Profinsi' },
    { name: 'agama', label: 'Agama', type: 'text', placeholder: 'Agama' },
    { name: 'golongan_darah', label: 'Golongan Darah', type: 'text', placeholder: 'Golongan Darah' },
    { name: 'sim_a', label: 'SIM A', type: 'text', placeholder: 'SIM A' },
    { name: 'sim_b', label: 'SIM B', type: 'text', placeholder: 'SIM B' },
    { name: 'sim_c', label: 'SIM C', type: 'text', placeholder: 'SIM C' },
    {
      name: 'user_status', label: 'Status Karyawan', type: 'radio', options: [
        { value: 'magang', label: 'Magang' },
        { value: 'kontrak', label: 'Kontrak' },
        { value: 'tetap', label: 'Tetap' },
        { value: 'resign', label: 'Resign' }
      ]
    },
    { name: 'join_date', label: 'Tanggal Gabung', type: 'text', placeholder: 'Tanggal Gabung' },
    { name: 'end_date', label: 'Tanggal Keluar', type: 'text', placeholder: 'Tanggal Keluar' },
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
        <h2 className="subtitle">Update User</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <DynamicForm
                fields={fields}
                initialData={initialData}
                onSubmit={updateUser}
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

export default EditUser;