import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminDataAPI from "./admindataAPI";
import { jwtDecode } from "jwt-decode";


export const readAllPersonalData = createAsyncThunk('data/personalData', async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await adminDataAPI.get('/patients', token);

        return res.data;
    } catch (error) {
        console.log("Error reading all user data: ", error);
        throw error;
    }
})

export const updateUserPersonalData = createAsyncThunk('data/updatePersonalData', async (personalData) => {
    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token)
        const res = await adminDataAPI.post(`/patients/${token}`, personalData, token);

        return res.data
    } catch (error) {
        console.log("Error updating personal data: ", error);
        throw error;

    }
})

const saveUserPersonalInfo = (usersPersonalInfo) => {
    localStorage.setItem('usersPersonalInfo', JSON.stringify(usersPersonalInfo));

}

const loadUserPersonalInfo = () => {
    const usersPersonalInfo = localStorage.getItem('usersPersonalInfo');

    return usersPersonalInfo ? JSON.parse(usersPersonalInfo) : [];
}

const adminPersonalDataSlice = createSlice({
    name: 'all-users',
    initialState: {
        usersPersonalData: loadUserPersonalInfo(),
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readAllPersonalData.fulfilled, (state, action) => {
            state.usersPersonalData = action.payload;
            saveUserPersonalInfo(action.payload)
        })
        builder.addCase(updateUserPersonalData.fulfilled, (state, action) => {
            state.usersPersonalData[0] = action.payload;
            saveUserPersonalInfo(action.payload);
        })
    }
})

export default adminPersonalDataSlice.reducer;


