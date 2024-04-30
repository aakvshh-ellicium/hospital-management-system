import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RiSafariFill } from "react-icons/ri";
import adminAPI from "./adminAPI";
import { jwtDecode } from "jwt-decode";

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

export const deleteUserData = createAsyncThunk('data/deleteUserData', async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken)
        const res = await adminAPI.delete(`/api/PatientData/${decodedToken.ID}`, userId, token);

        return res.data
    } catch (error) {
        console.log(error)
        throw error;
    }
    

})

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
        builder.addCase(deleteUserData.fulfilled, (state, action) => {
            state.usersData = state.usersData.filter(data => data.Id !== action.payload);
            saveUserInfo(state.usersData)
        })
    }
})

export default adminSlice.reducer;