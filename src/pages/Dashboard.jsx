import React, {useEffect} from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Dashboard = () => {
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

  return (
    <Layout>
        <Welcome/>
    </Layout>
  )
}

export default Dashboard