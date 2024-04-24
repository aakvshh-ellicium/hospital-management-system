import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../app/features/users/usersSlice';
import userInfoReducer from '../app/features/user-info/userInfoSlice';
import familyInfoReducer from '../app/features/familyInfo/familyInfoSlice'
import adminReducer from '../app/features/admin/adminSlice'
import documentReducer, { uploadDocuments } from '../app/features/uploadDocuments/uploadDocumentsSlice'
import adminPersonalDataReducer from '../app/features/admin/adminPersonalDataSlice'
import adminFamilyDataReducer from '../app/features/admin/adminFamilyDataSlice'

export default configureStore({
    reducer: {
        users: usersReducer,
        userInfo: userInfoReducer,
        familyInfo: familyInfoReducer,
        admin: adminReducer,
        uploadDocuments: documentReducer,
        usersPersonalInfo: adminPersonalDataReducer,
        usersFamilyInfo: adminFamilyDataReducer
    }
})