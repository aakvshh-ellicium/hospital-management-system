import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RiSafariFill } from "react-icons/ri";
import adminAPI from "./adminAPI";

export const readUserInformation = createAsyncThunk('userInformation/readUserInformation', async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await adminAPI.get('/api/PatientData', token);
        
        return res.data;
    } catch (error) {
        console.log('Error fetching users information', error);
        throw error;
    }
})

// export const updateUserInformation = createAsyncThunk('')

const saveUserInfo = (allUserInfo) => {
    localStorage.setItem('usersInformation', JSON.stringify(allUserInfo));

}

const loadUserInfo = () => {
    const allUserInfo = localStorage.getItem('usersInformation');

    return allUserInfo ? JSON.parse(allUserInfo) : [];
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        usersData: loadUserInfo(),
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readUserInformation.fulfilled, (state, action) => {
            state.loading = false;
            state.usersData = action.payload;
            saveUserInfo(action.payload)
        })
    }
})

export default adminSlice.reducer;