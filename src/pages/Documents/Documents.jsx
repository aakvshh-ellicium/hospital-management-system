import React from 'react'
import styles from './Documents.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Documents = () => {
  return (
    <>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.data}>
          <h2>Documents</h2><br /><br />

          <form className={styles.form}>
            <div className={styles.input}>
                <p>Submit your Aadhar Card (front-side) here: </p>
                <div>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input type="file" />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit your Aadhar Card (back-side) here: </p>
                <div>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input type="file" />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit medical insurance card (front-side) here: </p>
                <div>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input type="file" />
                </div>
            </div>
            <div className={styles.input}>
                <p>Submit medical insurance card (back-side) here: </p>
                <div>
                    <div className={styles.inputField}>
                        <MdFileUpload className={styles.inputImage} />
                        <p>Browse files</p>
                    </div>
                    <input type="file" />
                </div>
            </div><br /><br />
            <button type='submit' style={{float: 'center', marginBottom: '8em'}}>Edit</button>
        </form>


        </div>
    </>
  )
}

export default Documents