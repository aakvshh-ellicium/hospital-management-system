import React, { useEffect, useState } from 'react'
import styles from './Modal.module.css'
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';

const Modal = ({id, data, onClose}) => {
  
    const userData = data?.filter(user => user.Id === id);
    console.log(userData)
    
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {
          userData.length === 0 ? <span className={styles.noData}>Sorry, no data present</span> : (
            <span className={styles.modal}>
              <p id={styles.header}>Profile</p><br />
              <p>Id: {userData[0]?.Id}</p>
              <p>Father's Name: {userData[0]?.FathersName}</p>
              <p>Father's Age: {userData[0]?.FathersAge}</p>
              <p>Father's Country: {userData[0]?.FathersCountry}</p>
              <p>Mother's Name: {userData[0]?.MothersName}</p>
              <p>Mother's Age: {userData[0]?.mothersAge}</p>
              <p>Mother's Country:{userData[0]?.motherCountry}</p>
              <p>Parents having cardiac issue in past: {userData[0]?.CardiacPast === 0 ? 'No' : 'Yes'}</p>
              <p>Parents having cardiac issue in present: {userData[0]?.cardiacPresent === 0 ? 'No' : 'Yes'}</p>
              <p>Diabetic: {userData[0]?.diabetic === 0 ? 'No' : 'Yes'}</p>
              <p>Pre-Diabetic: {userData[0]?.preDiabetic === 0 ? 'No' : 'Yes'}</p>
            </span>
          ) 
        }
        <span className={styles.closeBtn} onClick={onClose}>
          <IoMdClose size={25} />
        </span>
      </div>
    </div>
  )
}

export default Modal;