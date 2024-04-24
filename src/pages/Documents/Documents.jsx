import React, { useEffect, useState } from 'react'
import styles from './Documents.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readDocuments, updateDocuments } from '../../app/features/uploadDocuments/uploadDocumentsSlice';

const Documents = () => {
    const dispatch = useDispatch();
    const {files} = useSelector(state => state.uploadDocuments);
    const [isEditable, setIsEditable] = useState(false);
    const [file, setFile] = useState(null);

    const handleClick = () => {
        setIsEditable(true);
    }
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleDocSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newFiles = Object.fromEntries(formData);
        console.log(newFiles);

        dispatch(updateDocuments(newFiles));

        setIsEditable(false);
    }

    console.log(files)
  return (
    <>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.data}>
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
                    <input name='aadharCardFront' onChange={handleChange} disabled={!isEditable} type="file" />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit your Aadhar Card (back-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='aadharCardBack' onChange={handleChange} disabled={!isEditable} type="file" />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit medical insurance card (front-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='medicalInsuranceCardFront' onChange={handleChange} disabled={!isEditable}type="file" />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit medical insurance card (back-side) here: </p>
                <div id={styles.align}>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input name='medicalInsuranceCardBack' onChange={handleChange} disabled={!isEditable} type="file" />
                </div>
            </div><br /><br />
        </form>


        </div>
    </>
  )
}

export default Documents