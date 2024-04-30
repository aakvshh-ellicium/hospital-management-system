import React, { useEffect, useState } from 'react'
import styles from './Documents.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readDocuments, updateDocuments } from '../../app/features/uploadDocuments/uploadDocumentsSlice';
import MainLayout from '../../components/Layout/MainLayout';
import toast from 'react-hot-toast';

const Documents = () => {
    const dispatch = useDispatch();
    const {files} = useSelector(state => state.uploadDocuments);
    const [isEditable, setIsEditable] = useState(false);
    // const [file, setFile] = useState(null);
    // const [invalidFiles, setInvalidFiles] = useState({});
    const handleClick = () => {
        setIsEditable(true);
    }
    
    const invalidFiles = {}

    const isValidFileUploaded=(file)=>{
        const validExtensions = ['png','jpeg','jpg', 'pdf']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }
    const handleChange = (e) => {
        const file = e.target.files[0];


        if(isValidFileUploaded(file)){
          toast.success("File uploaded successfully");
          delete invalidFiles.validity;
        console.log(invalidFiles)
        }else{
            toast.error("Invalid file type")
            invalidFiles.validity = 'No';
            console.log(invalidFiles)
        }
    }

    const handleDocSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        // const validationErrors = {...invalidFiles}

        console.log(invalidFiles)

        if (Object.keys(invalidFiles).length !== 0) {
            toast.error("Files can be only of png/jpg/jpeg/pdf format")
        }
        else if (Object.keys(invalidFiles).length === 0){
            const newFiles = Object.fromEntries(formData);
            console.log(newFiles);

            dispatch(updateDocuments(newFiles));
            toast.success("Documents updated successfully")
            setIsEditable(false);
        } 
        
    }

    console.log(files)
  return (
    <>
        <MainLayout>
        
            <div className={styles.title}>
                <h2>Documents</h2>
                <div className={styles.headerRight}>
                    {!isEditable && <button onClick={handleClick}>Edit</button>}
                    {isEditable && <button type='submit' form={styles.form}>Update</button>}
                </div>
            </div><br /><br />

          <form id={styles.form} onSubmit={handleDocSubmit} className={styles.form}>
            <div className={styles.input}>
                <p>Submit your Aadhar Card (front-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='aadharCardFront' onChange={handleChange} disabled={!isEditable} type="file" required />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit your Aadhar Card (back-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='aadharCardBack' onChange={handleChange} disabled={!isEditable} type="file" required />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit medical insurance card (front-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='medicalInsuranceCardFront' onChange={handleChange} disabled={!isEditable}type="file" required />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit medical insurance card (back-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='medicalInsuranceCardBack' onChange={handleChange} disabled={!isEditable} type="file" required />
                </div>
            </div><br /><br />
        </form>

        </MainLayout>
        
    </>
  )
}

export default Documents