import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {LoginUser, reset} from "../features/authSlice"
import DynamicForm from './DynamicForm';

const Login = () => {
    const dispacth = useDispatch();
    const navigate = useNavigate();
    // ambil value dari redux store
    const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)

    useEffect(()=> {
        // jika terdapat user atau berhasil login
        if(user || isSuccess){
            navigate("/dashboard")
        }
        // setelah itu reset lagi
        dispacth(reset())
    }, [user, isSuccess, dispacth, navigate]);

    const fields = [
        { name: 'email', label: 'Email', type: 'text', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: 'Email' },
        { name: 'password', label: 'Password', type: 'password', className: 'input', wrapperClassName: 'field', labelClassName: 'label', placeholder: '******' }
    ];

    const Auth = (data) =>{
        dispacth(LoginUser(data));
    }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-4">
                    <DynamicForm
                        fields={fields}
                        onSubmit={Auth}
                        errorMsg={isError ? message : null}
                        buttonText="Login"
                        buttonClassName="button is-success is-fullwidth"
                        formClassName="box"
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Login