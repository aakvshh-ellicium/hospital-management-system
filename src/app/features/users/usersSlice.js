import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersAPI from "./usersAPI";
import baseURL from "../../../api/api";

// export const readUser = createAsyncThunk('/', async () => {
//     const res = await usersAPI.get('/api/PatientData')
// })

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
    const res = await usersAPI.post('/api/PatientData',  newUser)
    console.log(res.data)
    return res.data;
})

export const deleteUser = createAsyncThunk('users/deleteUser', async () => {
    try{
        const token = localStorage.getItem('token');
        const res = await usersAPI.delete('/api/PatientData', token)

        return res.data;
    } catch(error) {
        console.log("Error deleting user: ", error)
        throw error;
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
    },
    reducers: {},
    extraReducers: (builder) =>  {
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.data = state.data.filter(data => data.Id !== action.payload);
        })
        
    }
})

export default usersSlice.reducer;












