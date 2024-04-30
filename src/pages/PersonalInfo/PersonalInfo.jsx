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
import MainLayout from '../../components/Layout/MainLayout'
import toast from 'react-hot-toast'
import { readFamilyInfo } from '../../app/features/familyInfo/familyInfoSlice'

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
    
    const inputWeightPattern = /.\d\d/;
    
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

        const validationErrors = {};
        const namePattern = /^([a-zA-Z ]){2,30}$/;
        const weightPattern = /^(0|[1-9]\d*)(,\d+)?$/;
        const heightPattern = /\d-\d$/;
        const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (!updatedUserDataOne.mobileNumber.trim()) {
            validationErrors.phone = "Phone number is required";
            toast.error(validationErrors.phone)
        } else if (!phonePattern.test(updatedUserDataOne.mobileNumber)) {
            validationErrors.phone = "Phone is not valid";
            toast.error(validationErrors.phone)
        }

        if (!updatedUserDataOne.firstName.trim()) {
            validationErrors.firstName = "First Name is required";
            toast.error(validationErrors.firstName)
        } else if (!namePattern.test(updatedUserDataOne.firstName)) {
            validationErrors.firstName = "First Name is not valid";
            toast.error(validationErrors.firstName)
        }

        if (!updatedUserDataOne.lastName.trim()) {
            validationErrors.lastName = "Last Name is required";
            toast.error(validationErrors.lastName)
        } else if (!namePattern.test(updatedUserDataOne.lastName)) {
            validationErrors.lastName = "Last Name is not valid";
            toast.error(validationErrors.lastName)
        }

        if (!updatedUserDataOne.weight.trim()) {
            validationErrors.weight = "Weight is required";
            toast.error(validationErrors.weight)
        } else if (!weightPattern.test(updatedUserDataOne.weight)) {
            validationErrors.weight = "Weight is not valid";
            toast.error(validationErrors.weight)
        }

        if (!updatedUserDataOne.height.trim()) {
            validationErrors.height = "Height is required";
            toast.error(validationErrors.height)
        } else if (!heightPattern.test(updatedUserDataOne.height)) {
            validationErrors.height = "Height is not valid, enter value in x-y";
            toast.error(validationErrors.height)
        }

        if (!updatedUserDataOne.countryOfOrigin.trim()) {
            validationErrors.countryOfOrigin = "Country name is required";
            toast.error(validationErrors.countryOfOrigin)
        } else if (!namePattern.test(updatedUserDataOne.countryOfOrigin)) {
            validationErrors.countryOfOrigin = "Country name is not valid";
            toast.error(validationErrors.countryOfOrigin)
        }

        // console.log(updatedUserDataTwo)
        if (Object.keys(validationErrors).length === 0){
            const updatedUserData = {...updatedUserDataOne, ...updatedUserDataTwo};
            dispatch(updateUserInfo(updatedUserData))
            console.log(updatedUserData)
            toast.success("Personal Info updated successfully")
            dispatch(readUserInfo());
            setIsEditable(false); 
        }
              
    }
    
      useEffect(() => {
        dispatch(readUserInfo());
      }, [dispatch]);

      useEffect(() => {
        dispatch(readFamilyInfo());
      }, [dispatch]);

  return (
    <>
        <MainLayout>
        
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
                  <input name="firstName" type="text" defaultValue={firstName} readOnly={!isEditable} className={styles.inputField} placeholder='First Name' required />
                </div>
              <div>
                  <CgRename className={styles.inputImage} />
                  <input name="lastName" type="text" defaultValue={lastName} readOnly={!isEditable} className={styles.inputField} placeholder='Last Name' required />
              </div>
              <div>
                  <FaPhone className={styles.inputImage} />
                  <input name="mobileNumber" type="tel" defaultValue={mobileNumber} readOnly={!isEditable} className={styles.inputField} placeholder='Phone' required />
              </div>
              <div>
                  <MdOutlineDateRange className={styles.inputImage} />
                  <input name="dateOfBirth" type="date" defaultValue={dateOfBirth.split('T', 1)} readOnly={!isEditable} className={styles.inputField} placeholder='Date of Birth' required />
              </div>
              <div>
                  <FaWeightScale className={styles.inputImage} />
                  <input name="weight" type="tel" defaultValue={weight.replace(inputWeightPattern, '')} readOnly={!isEditable} className={styles.inputField} placeholder='Weight' required />
              </div>
              <div>
                  <GiBodyHeight className={styles.inputImage} />
                  <input name="height" type="tel" defaultValue={height} readOnly={!isEditable} className={styles.inputField} placeholder='Height' required />
              </div>
              <div>
                  <FaRegFlag className={styles.inputImage} />
                  <input name="countryOfOrigin" type="text" defaultValue={countryOfOrigin} readOnly={!isEditable} className={styles.inputField} placeholder='Country' required />
              </div>
              <div>
                  <GiHospitalCross className={styles.inputImage} />
                  <p>Are you diabetic or pre-diabetic?</p>
                  <div className={styles.check}>
                      <label htmlFor="">Yes</label>
                      <input defaultValue={diabetic} checked={diabetic === 1} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setDiabetic(1)} required />
                  </div>
                  <div className={styles.check}>
                      <label htmlFor="">No</label>
                      <input defaultValue={diabetic} checked={diabetic === 0} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setDiabetic(0)} required />
                  </div>
              </div>
              <div style={{textAlign: 'left', border: 'none'}}>
                  <FaHeartCircleExclamation className={styles.inputImage} />
                  <p>Have you suffered any cardiac related issues in the past or are suffering currently?</p>
                  <div className={styles.check}>
                      <label htmlFor="">Yes</label>
                      <input defaultValue={cardiacIssues} checked={cardiacIssues === 1} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setCardiacIssues(1)} required />
                  </div>
                  <div className={styles.check}>
                      <label htmlFor="">No</label>
                      <input defaultValue={cardiacIssues} checked={cardiacIssues === 0} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setCardiacIssues(0)} required />
                  </div>
              </div>
              <div style={{textAlign: 'left', border: 'none'}}>
                  <FaDroplet className={styles.inputImage} />
                  <p>Do you have concerns with your blood pressure?</p>
                  <div className={styles.check}>
                      <label htmlFor="">Yes</label>
                      <input defaultValue={bloodPressureConcerns} checked={bloodPressureConcerns === 1} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setBloodPressureConcerns(1)} required />
                  </div>
                  <div className={styles.check}>
                      <label htmlFor="">No</label>
                      <input defaultValue={bloodPressureConcerns} checked={bloodPressureConcerns === 0} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setBloodPressureConcerns(0)} required />
                  </div>
              </div>
              <div style={{textAlign: 'left', border: 'none'}}>
                  <label htmlFor="">Disease Type</label>
                  <select defaultValue={typeOfDisease} disabled={!isEditable} id="" className={styles.dropdown} required>
                      <option className={styles.option} value="type-1" onClick={() => setTypeOfDisease('type-1')}>Type 1</option>
                      <option className={styles.option} value="type-2" onClick={() => setTypeOfDisease('type-2')}>Type 2</option>
                      <option className={styles.option} value="type-3" onClick={() => setTypeOfDisease('type-3')}>Type 3</option>
                      <option className={styles.option} value="type-4" onClick={() => setTypeOfDisease('type-4')}>Type 4</option>
                  </select>
              </div>
              <textarea required defaultValue={diseaseDesc} onChange={(e) => setDiseaseDesc(e.target.value)} readOnly={!isEditable} id="" cols="30" rows="8" placeholder='Enter your Disease description' className={styles.diseaseDescription}></textarea>

            </form>
        </MainLayout>
    </>
  )
}

export default PersonalInfo