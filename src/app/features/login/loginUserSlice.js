import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginAPI from "./loginUserAPI";


export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
    try {
        const res = await loginAPI.post('/api/login', user)

        return res.data;

    } catch (error) {
        console.log("Error logging user: ", error);
        throw error;
    }
})

const loginUserSlice = createSlice({
    name: 'login',
    initialState: {
        user: [],

    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})

export default loginUserSlice.reducer;

