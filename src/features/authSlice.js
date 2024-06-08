import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const LoginUser = createAsyncThunk("users/loginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email : user.email,
            password : user.password
        });
        return response.data;
    } catch (error) {
        if(error.message){
            // ambil data eror dari backend dengan key msg
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const getMe = createAsyncThunk("users/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if(error.message){
            // ambil data eror dari backend dengan key msg
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const LogOut = createAsyncThunk("users/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout'); 
})

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        // jika pending LoginUser
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true
        });
        // jika berhasil LoginUser
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        // jika eror ambil pesannya LoginUser
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        // jika pending get user login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true
        });
        // jika berhasil
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        // jika eror ambil pesannya
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;