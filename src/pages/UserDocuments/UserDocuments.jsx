import React, { useState } from 'react'
import styles from './UserDocuments.module.css'
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocuments } from '../../app/features/uploadDocuments/uploadDocumentsSlice';
import toast from 'react-hot-toast';

const UserDocuments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [file, setFile] = useState();
    // const {files} = useSelector(state => state.uploadDocuments)

    const isValidFileUploaded=(file)=>{
        const validExtensions = ['png','jpeg','jpg', 'pdf']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }
    
    const handleChange = (e) => {
        const file = e.target.files[0]

        if(isValidFileUploaded(file)){
          toast.success("File uploaded successfully")
        }else{
            toast.error("Invalid file type")
        }
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const files = Object.fromEntries(formData);
        console.log(files);

        dispatch(uploadDocuments(files));
        toast.success("Documents uploaded successfully")
        navigate('/dashboard')

    }

  return (
    <section>
        <div className={styles.wrapper}>
            <h2>Submit Documents</h2><br /><br />
            <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <p>Submit your Aadhar Card (front-side) here: </p>
                    <label htmlFor={styles.fileUploadOne}>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input id={styles.fileUploadOne} name='aadharCardFront' type="file" required onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.input}>
                    <p>Submit your Aadhar Card (back-side) here: </p>
                    <label htmlFor={styles.fileUploadTwo}>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input id={styles.fileUploadTwo} name='aadharCardBack' type="file" required onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.input}>
                    <p>Submit medical insurance card (front-side) here: </p>
                    <label htmlFor={styles.fileUploadThree}>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input id={styles.fileUploadThree} name='medicalInsuranceCardFront' type="file" required onChange={handleChange} />
                    </label>
                </div>
                <div className={styles.input}>
                    <p>Submit medical insurance card (back-side) here: </p>
                    <label htmlFor={styles.fileUploadFour}>
                        <div className={styles.inputField}>
                            <MdFileUpload className={styles.inputImage} />
                            <p>Browse files</p>
                        </div>
                        <input id={styles.fileUploadFour} name='medicalInsuranceCardBack' type="file" required onChange={handleChange} />
                    </label>
                </div><br /><br />
                <button type='submit' style={{float: 'center', marginBottom: '8em'}}>Submit</button>
            </form>

        </div>
    </section> 
  )
}

export default UserDocuments;