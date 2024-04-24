import React, { useState } from 'react'
import styles from './UserDocuments.module.css'
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocuments } from '../../app/features/uploadDocuments/uploadDocumentsSlice';

const UserDocuments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const {files} = useSelector(state => state.uploadDocuments)

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const files = Object.fromEntries(formData);
        console.log(files);

        dispatch(uploadDocuments(files));
        navigate('/dashboard')

    }

  return (
    <section>
        <div className={styles.wrapper}>
            <h2>Submit Documents</h2><br /><br />
            <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <p>Submit your Aadhar Card (front-side) here: </p>
                    <div>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input name='file-1' type="file" onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.input}>
                    <p>Submit your Aadhar Card (back-side) here: </p>
                    <div>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input name='file-2' type="file" onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.input}>
                    <p>Submit medical insurance card (front-side) here: </p>
                    <div>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input name='file-3' type="file" onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.input}>
                    <p>Submit medical insurance card (back-side) here: </p>
                    <div>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input name='file-4' type="file" onChange={handleChange} />
                    </div>
                </div><br /><br />
                <button type='submit' style={{float: 'center', marginBottom: '8em'}}>Submit</button>
            </form>

        </div>
    </section>
  )
}

export default UserDocuments