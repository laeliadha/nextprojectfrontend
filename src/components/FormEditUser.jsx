import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DynamicForm from '../components/DynamicForm';

const FormEditUser = () => {
  const [initialData, setInitialData] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setInitialData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        });
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

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
    { name: 'name', label: 'Name', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Name' },
    { name: 'email', label: 'Email', type: 'email', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Email' },
    { name: 'password', label: 'Password', type: 'password', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: '******' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: '******' },
    {
      name: 'role', label: 'Role', type: 'select', className: 'select is-fullwidth', wrapperClassName: 'field', labelClassName: 'label', options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
      ]
    }
  ];

  return (
    <div>
      <h1 className='title'>Users</h1>
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
  );
};

export default FormEditUser;
