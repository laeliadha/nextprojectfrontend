import React, {useEffect} from 'react';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditUser = () => {
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

  return (
    <Layout>
        <FormEditUser/>
    </Layout>
  )
}

export default EditUser