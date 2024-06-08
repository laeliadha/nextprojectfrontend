import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DynamicForm from './DynamicForm';

const FormEditProduct = () => {
    const [initialData, setInitialData] = useState({});
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setInitialData({
                    name: response.data.name,
                    price: response.data.price
                });
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getProductById();
    }, [id]);

    const updateProduct = async (data) => {
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, data);
            navigate("/products");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const fields = [
        { name: 'name', label: 'Name', type: 'text', className : 'input', wrapperClassName : 'field', labelClassName: 'label', placeholder: 'Name', wrapperInputClassName : 'control'},
        { name: 'price', label: 'Price', type: 'number', className : 'input', wrapperClassName : 'field',labelClassName: 'label', placeholder: 'Price', wrapperInputClassName : 'control'}
    ];

    return (
        <div>
            <h1 className='title'>Product</h1>
            <h2 className="subtitle">Edit Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <DynamicForm
                            fields={fields}
                            initialData={initialData}
                            onSubmit={updateProduct}
                            errorMsg={msg}
                            buttonText="Update"
                            buttonClassName="button is-success"
                            formClassName="form-edit-product"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormEditProduct;