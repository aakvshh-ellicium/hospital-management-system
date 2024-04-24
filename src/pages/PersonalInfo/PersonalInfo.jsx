import React, { useEffect, useState } from 'react'
import styles from './PersonalInfo.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import RegisterImage from '../../assets/signup-image.svg'
import RegisterIcon from '../../assets/stethoscope.svg'
import { CgRename } from "react-icons/cg";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaWeightScale } from "react-icons/fa6";
import { GiBodyHeight } from "react-icons/gi";
import { IoBody } from "react-icons/io5";
import { FaRegFlag } from "react-icons/fa6";
import { GiHospitalCross } from "react-icons/gi";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { readUserInfo, updateUserInfo } from '../../app/features/user-info/userInfoSlice'

const PersonalInfo = () => {
    const {userInfoData} = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const [{Id, firstName, lastName, mobileNumber, dateOfBirth, age, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription}] = userInfoData.data;
    console.log(userInfoData.data);

    const [isEditable, setIsEditable] = useState(false);
    const [diabetic, setDiabetic] = useState(isDiabetic);
    const [cardiacIssues, setCardiacIssues] = useState(hasCardiacIssues);
    const [bloodPressureConcerns, setBloodPressureConcerns] = useState(hasBloodPressureConcerns);
    const [typeOfDisease, setTypeOfDisease] = useState(diseaseType)
    const [diseaseDesc, setDiseaseDesc] = useState(diseaseDescription)
    
    
    const handleEditData = () => {
        setIsEditable(true);
    }
    // console.log(isEditable)

    const handleInputSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const updatedUserDataOne = {};

        formData.forEach((value, key) => {
            updatedUserDataOne[key] = value;
        })

        // console.log(updatedUserDataOne)

        const updatedUserDataTwo = {
            isDiabetic: diabetic,
            hasCardiacIssues: cardiacIssues,
            hasBloodPressureConcerns: bloodPressureConcerns,
            diseaseType: typeOfDisease,
            diseaseDescription: diseaseDesc
        };

        // console.log(updatedUserDataTwo)

        const updatedUserData = {...updatedUserDataOne, ...updatedUserDataTwo};
        dispatch(updateUserInfo(updatedUserData))
        console.log(updatedUserData)
        dispatch(readUserInfo());
        setIsEditable(false);       
    }

  return (
    <>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        
        <div className={styles.data}>
            <div className={styles.header}>
                <h2>Personal Info</h2><br /><br />
                <div className={styles.headerRight}>
                    {!isEditable && <button onClick={handleEditData}>Edit</button>}
                    {isEditable && <button type='submit' form={styles.form}>Update</button>}
                </div>
            </div>

            <form id={styles.form} onSubmit={handleInputSubmit} className={styles.form}>
                <div>
                  <CgRename className={styles.inputImage} />
                  <input name="firstName" type="text" defaultValue={firstName} readOnly={!isEditable} className={styles.inputField} placeholder='First Name' />
                </div>
              <div>
                  <CgRename className={styles.inputImage} />
                  <input name="lastName" type="text" defaultValue={lastName} readOnly={!isEditable} className={styles.inputField} placeholder='Last Name' />
              </div>
              <div>
                  <FaPhone className={styles.inputImage} />
                  <input name="mobileNumber" type="tel" defaultValue={mobileNumber} readOnly={!isEditable} className={styles.inputField} placeholder='Phone' />
              </div>
              <div>
                  <MdOutlineDateRange className={styles.inputImage} />
                  <input name="dateOfBirth" type="date" defaultValue={dateOfBirth.split('T', 1)} readOnly={!isEditable} className={styles.inputField} placeholder='Date of Birth' />
              </div>
              <div>
                  <FaWeightScale className={styles.inputImage} />
                  <input name="weight" type="tel" defaultValue={weight} readOnly={!isEditable} className={styles.inputField} placeholder='Weight' />
              </div>
              <div>
                  <GiBodyHeight className={styles.inputImage} />
                  <input name="height" type="tel" defaultValue={height} readOnly={!isEditable} className={styles.inputField} placeholder='Height' />
              </div>
              <div>
                  <FaRegFlag className={styles.inputImage} />
                  <input name="countryOfOrigin" type="text" defaultValue={countryOfOrigin} readOnly={!isEditable} className={styles.inputField} placeholder='Country' />
              </div>
              <div>
                  <GiHospitalCross className={styles.inputImage} />
                  <p>Are you diabetic or pre-diabetic?</p>
                  <div className={styles.check}>
                      <label htmlFor="">Yes</label>
                      <input defaultValue={diabetic} checked={diabetic === 1} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setDiabetic(1)} />
                  </div>
                  <div className={styles.check}>
                      <label htmlFor="">No</label>
                      <input defaultValue={diabetic} checked={diabetic === 0} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setDiabetic(0)} />
                  </div>
              </div>
              <div style={{textAlign: 'left', border: 'none'}}>
                  <FaHeartCircleExclamation className={styles.inputImage} />
                  <p>Have you suffered any cardiac related issues in the past or are suffering currently?</p>
                  <div className={styles.check}>
                      <label htmlFor="">Yes</label>
                      <input defaultValue={cardiacIssues} checked={cardiacIssues === 1} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setCardiacIssues(1)} />
                  </div>
                  <div className={styles.check}>
                      <label htmlFor="">No</label>
                      <input defaultValue={cardiacIssues} checked={cardiacIssues === 0} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setCardiacIssues(0)} />
                  </div>
              </div>
              <div style={{textAlign: 'left', border: 'none'}}>
                  <FaDroplet className={styles.inputImage} />
                  <p>Do you have concerns with your blood pressure?</p>
                  <div className={styles.check}>
                      <label htmlFor="">Yes</label>
                      <input defaultValue={bloodPressureConcerns} checked={bloodPressureConcerns === 1} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setBloodPressureConcerns(1)} />
                  </div>
                  <div className={styles.check}>
                      <label htmlFor="">No</label>
                      <input defaultValue={bloodPressureConcerns} checked={bloodPressureConcerns === 0} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setBloodPressureConcerns(0)} />
                  </div>
              </div>
              <div style={{textAlign: 'left', border: 'none'}}>
                  <label htmlFor="">Disease Type</label>
                  <select defaultValue={typeOfDisease} disabled={!isEditable} id="" className={styles.dropdown}>
                      <option className={styles.option} value="type-1" onClick={() => setTypeOfDisease('type-1')}>Type 1</option>
                      <option className={styles.option} value="type-2" onClick={() => setTypeOfDisease('type-2')}>Type 2</option>
                      <option className={styles.option} value="type-3" onClick={() => setTypeOfDisease('type-3')}>Type 3</option>
                      <option className={styles.option} value="type-4" onClick={() => setTypeOfDisease('type-4')}>Type 4</option>
                  </select>
              </div>
              <textarea defaultValue={diseaseDesc} onChange={(e) => setDiseaseDesc(e.target.value)} readOnly={!isEditable} id="" cols="30" rows="8" placeholder='Enter your Disease description' className={styles.diseaseDescription}></textarea>

            </form>
        </div>
    </>
  )
}

export default PersonalInfo