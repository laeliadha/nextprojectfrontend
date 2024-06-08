import React, {useEffect} from 'react';
import Layout from './Layout';
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Products = () => {
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
        <ProductList/>
    </Layout>
  )
}

export default Products