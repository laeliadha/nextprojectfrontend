import React, {useEffect} from 'react';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Dashboard = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  // ambil user dan eror dari state
  const {user, isError} = useSelector((state => state.auth));

  useEffect(()=> {
    dispacth(getMe());
  },[dispacth]);

  // validasi
  useEffect(()=> {
    if(isError){
      navigate("/");
    }
  },[isError, navigate]); 

  return (
    <Layout>
        <div>
          <h1 className='title'>Dashboard</h1>
          <h2 className="subtitle">Welcome back <strong>{user && user.name}</strong></h2>
        </div>
    </Layout>
  )
}

export default Dashboard