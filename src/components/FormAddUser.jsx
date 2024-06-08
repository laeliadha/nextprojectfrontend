import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async(e) =>{
        // tambahkan preventDefault agar tidak reload saat submit
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name : name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                role: role
            });
            navigate("/users");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className="subtitle">Add New User</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveUser}>
                        <p className='help'>{msg}</p>
                        <div className="field">
                            <label htmlFor="" className="label">Name</label>
                            <div className="control">
                                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="input" placeholder='Name' />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="" className="label">Email</label>
                            <div className="control">
                                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="input" placeholder='Email' />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="" className="label">Password</label>
                            <div className="control">
                                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="input" placeholder='******' />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="" className="label">Confirm Password</label>
                            <div className="control">
                                <input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="input" placeholder='******' />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="" className="label">Role</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select value={role} onChange={(e)=> setRole(e.target.value)}>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                            <button type='submit' className="button is-success">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddUser