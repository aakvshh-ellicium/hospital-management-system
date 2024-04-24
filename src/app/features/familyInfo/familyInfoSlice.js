import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import familyInfoAPI from "./familyInfoAPI";
import { jwtDecode } from "jwt-decode";

export const readFamilyInfo = createAsyncThunk('familyInfo, readamilyInfo', async () => {
    try{
        const token = localStorage.getItem('token');
        const res = await familyInfoAPI.get('/api/FamilyData', token);

        return res.data;
    } catch (error){
        console.log('Error getting family info: ', error);
        throw error;
    }
})

export const addFamilyInfo = createAsyncThunk('familyInfo/addFamilyInfo', async (familyData) => {
    try{
        const token = localStorage.getItem('token');
        const res = await familyInfoAPI.post('/api/FamilyData', familyData, token);

        return res.data;

    } catch (error) {
        console.log('Error adding family info: ', error);
        throw error;
    }
})

export const updateFamilyInfo = createAsyncThunk('familyInfo/updateFamilyInfo', async (familyData) => {
    try {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token);
        
        const res = await familyInfoAPI.put(`/api/FamilyData/${decodedToken.ID}`, familyData, token);
        
        return res.data
    } catch (error) {
        console.log('Error updating Family info: ', error)
        throw error;
    }
})

const saveFamilyInfo = (familyInfo) => {
    console.log(familyInfo)
    localStorage.setItem('familyInfo', JSON.stringify(familyInfo));
}

const loadFamilyInfo = () => {
    const familyInfo = localStorage.getItem('familyInfo');

    return familyInfo ? JSON.parse(familyInfo) : [];
}

const familyInfoSlice = createSlice({
    name: 'familyInfo',
    initialState: {
        familyInfoData: loadFamilyInfo(),
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readFamilyInfo.fulfilled, (state, action) => {
            state.loading = 'idle',
            state.familyInfoData = action.payload;
            saveFamilyInfo(action.payload);
        })
        builder.addCase(addFamilyInfo.fulfilled, (state, action) => {
            const data = action.payload;
            state.familyInfoData.push(data);
            saveFamilyInfo(action.payload);

        })
        builder.addCase(updateFamilyInfo.fulfilled, (state, action) => {
            state.familyInfoData[0] = action.payload;
            saveFamilyInfo(action.payload);
        })
    }
})

export default familyInfoSlice.reducer;



