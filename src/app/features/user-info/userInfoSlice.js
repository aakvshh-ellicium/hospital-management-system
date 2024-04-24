import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import userInfoAPI from "./userInfoAPI";
import usersSlice, { addUser } from "../users/usersSlice";
import { useReducer } from "react";
import { jwtDecode } from "jwt-decode";

export const readUserInfo = createAsyncThunk('userInfo/readUserInfo', async () => {
    try{
        const token = localStorage.getItem('token');
        const res = await userInfoAPI.get('/patients', token);
        console.log(res)
        return res.data;
    } catch (error){
        console.log('Error getting user info: ', error);
        throw error;
    }
})

export const addUserInfo = createAsyncThunk('userInfo/addUserInfo', async (userData) => {
    try{
        const token = localStorage.getItem('token')
        const res = await userInfoAPI.post('/patients', userData, token);
        console.log(res)
        return res.config.data

    } catch (error) {
        console.log('Error adding user info: ', error);
        throw error;
    }
      
}) 

export const updateUserInfo = createAsyncThunk('updateInfo/updateUserInfo', async (userData) => {
    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const res = await userInfoAPI.put(`/patients/${decodedToken.ID}`, userData, token);
        console.log(res)
        return res.data 
    } catch (error) {
        console.log('Error updating user info: ', error);
        throw error;
    }
})

const saveUserInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

}

const loadUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');

    return userInfo ? JSON.parse(userInfo) : [];
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfoData: loadUserInfo(),
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readUserInfo.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.userInfoData = action.payload;
            saveUserInfo(action.payload)
        })
        builder.addCase(addUserInfo.fulfilled, (state, action) => {
            const data = action.payload;
            state.userInfoData.push(data);
            saveUserInfo(action.payload);
        })
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.userInfoData[0] = action.payload;
            saveUserInfo(action.payload)
            
        })
    }
});



export default userInfoSlice.reducer;