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
        
    }
})

export default usersSlice.reducer;












