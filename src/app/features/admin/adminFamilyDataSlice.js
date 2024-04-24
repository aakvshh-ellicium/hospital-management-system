import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminDataAPI from "./admindataAPI";


export const readAllFamilyInfo = createAsyncThunk('data/familyData', async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await adminDataAPI.get('/api/FamilyData', token);

        return res.data;
        

    } catch (error) {
        console.log("Error reading family data: ", error);
        throw error;
    }
})

const saveUserFamilyInfo = (usersFamilyInfo) => {
    localStorage.setItem('usersFamilyInfo', JSON.stringify(usersFamilyInfo));

}

const loadUserFamilyInfo = () => {
    const usersFamilyInfo = localStorage.getItem('usersFamilyInfo');

    return usersFamilyInfo ? JSON.parse(usersFamilyInfo) : [];
}

const adminFamilyDataSlice = createSlice({
    name: 'usersFamilyInfo',
    initialState: {
        usersFamilyData: loadUserFamilyInfo(),
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readAllFamilyInfo.fulfilled, (state, action) => {
            state.usersFamilyData = action.payload;
            saveUserFamilyInfo(action.payload);
        })
    }
})

export default adminFamilyDataSlice.reducer;


