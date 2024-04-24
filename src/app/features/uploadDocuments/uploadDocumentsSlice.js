import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadDocumentsAPI from "./uploadDocumentsAPI";


export const readDocuments = createAsyncThunk('documents/readDocuments', async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await uploadDocumentsAPI.get('/uploads/uploadDocuments', token);

        return res.data;

    } catch (error) {
        console.log(error)
        throw error;

    }
})

export const uploadDocuments = createAsyncThunk('documents/uploadDocuments', async (file) => {
    try {
        const token = localStorage.getItem('token');
        const res = await uploadDocumentsAPI.post('/uploads/uploadDocuments', file, token);

        return res.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
})

const saveFiles = (files) => {
    localStorage.setItem('files', JSON.stringify(files));

}

const loadFiles = () => {
    const files = localStorage.getItem('files');

    return files ? JSON.parse(files) : [];
}

const documentSlice = createSlice({
    name: 'documents',
    initialState: {
        files: loadFiles(),
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readDocuments.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.files = action.payload;
            saveFiles(action.payload)
        })
        builder.addCase(uploadDocuments.fulfilled, (state, action) => {
            const data = action.payload;
            state.files.push(data);
            saveFiles(action.payload);
        })
    }

})

export default documentSlice.reducer;



