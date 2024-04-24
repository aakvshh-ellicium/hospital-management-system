import React, { useState } from 'react'
import styles from './FamilyInfo.module.css'
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
import { readFamilyInfo, updateFamilyInfo } from '../../app/features/familyInfo/familyInfoSlice'

const FamilyInfo = () => {
    const dispatch = useDispatch();
    const {familyInfoData} = useSelector(state => state.familyInfo)

    const [{CardiacPast, FathersAge, FathersCountry, FathersName, MothersName, bloodPressure, cardiacPresent, diabetic, motherCountry, mothersAge, preDiabetic}] = familyInfoData.data
    const [isEditable, setIsEditable] = useState(false);
    const [isDiabetic, setIsDiabetic] = useState(diabetic === 1 ? true : false);
    const [isPreDiabetic, setIsPreDiabetic] = useState(preDiabetic === 1 ? true : false);
    const [isCardiacPast, setIsCardiacPast] = useState(CardiacPast === 1 ? true : false);
    const [isCardiacPresent, setIsCardiacPresent] = useState(cardiacPresent === 1 ? true : false);
    const [isBloodPressure, setIsBloodPressure] = useState(bloodPressure === 1 ? true : false);

    console.log(familyInfoData.data)
    const handleEditData = () => {
        setIsEditable(true);
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedFamilyDataOne = {};

        formData.forEach((value, key) => {
            updatedFamilyDataOne[key] = value;
        })

        const updatedFamilyData = {
            ...updatedFamilyDataOne,
            diabetic: isDiabetic,
            preDiabetic: isPreDiabetic,
            cardiacPresent: isCardiacPresent,
            CardiacPast: isCardiacPast,
            bloodPressure: isBloodPressure
        }

        console.log(updatedFamilyData)
        
        dispatch(updateFamilyInfo(updatedFamilyData));
        dispatch(readFamilyInfo())
        setIsEditable(false);
    }


  return (
    <>
         <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.data}>
            <div className={styles.title}>
                <h2>Family Info</h2>
                <div className={styles.headerRight}>
                    {!isEditable && <button onClick={handleEditData}>Edit</button>}
                    {isEditable && <button type='submit' form={styles.form}>Update</button>}

                </div>
            </div><br /><br />

          <form id={styles.form} onSubmit={handleInputSubmit} className={styles.form}>
            <div>
                <CgRename className={styles.inputImage} />
                <input name='FathersName' type="text" defaultValue={FathersName} readOnly={!isEditable} className={styles.inputField} placeholder="Father's Name" />
            </div>
            <div>
                <CgRename className={styles.inputImage} />
                <input name='FathersAge' type="number" defaultValue={FathersAge} readOnly={!isEditable} className={styles.inputField} placeholder="Father's Age" />
            </div>
            <div>
                <FaRegFlag className={styles.inputImage} />
                <input name='FathersCountry' type="text" defaultValue={FathersCountry} readOnly={!isEditable} className={styles.inputField} placeholder="Father's Country" />
            </div>
            <div>
                <CgRename className={styles.inputImage} />
                <input name='MothersName' type="text" defaultValue={MothersName} readOnly={!isEditable} className={styles.inputField} placeholder="Mother's Name" />
            </div>
            <div>
                <CgRename className={styles.inputImage} />
                <input name='mothersAge' type="number" defaultValue={mothersAge} readOnly={!isEditable} className={styles.inputField} placeholder="Mother's Age" />
            </div>
            <div>
                <FaRegFlag className={styles.inputImage} />
                <input name='motherCountry' type="text" defaultValue={motherCountry} readOnly={!isEditable} className={styles.inputField} placeholder="Mother's Country" />
            </div>
            <div style={{textAlign: 'left', border: 'none'}}>
                <GiHospitalCross className={styles.inputImage} />
                <p>Are you diabetic or pre-diabetic?</p>
                <div className={styles.check}>
                    <label htmlFor="">Diabetic</label>
                    <input defaultValue={isDiabetic} checked={isDiabetic === true} disabled={!isEditable} type="checkbox" className={styles.inputField} onClick={() => setIsDiabetic( isDiabetic === true ? false : true)} />
                </div>
                <div className={styles.check}>
                    <label htmlFor="">Pre-Diabetic</label>
                    <input defaultValue={isPreDiabetic} checked={isPreDiabetic === true} disabled={!isEditable} type="checkbox" className={styles.inputField} onClick={() => setIsPreDiabetic(isPreDiabetic === true ? false : true)} />
                </div>
            </div>
            
            
            <div style={{textAlign: 'left', border: 'none'}}>
                <FaHeartCircleExclamation className={styles.inputImage} />
                <p>Have you suffered any cardiac related issues in the past or are suffering currently?</p>
                <div className={styles.check}>
                    <label htmlFor="">Cardiac-Present</label>
                    <input defaultValue={isCardiacPresent} checked={isCardiacPresent === true} disabled={!isEditable} type="checkbox" className={styles.inputField} onClick={() => setIsCardiacPresent(isCardiacPresent === true ? false : true)} />
                </div>
                <div className={styles.check}>
                    <label htmlFor="">Cardiac-Past</label>
                    <input defaultValue={isCardiacPast} checked={isCardiacPast === true} disabled={!isEditable} type="checkbox" className={styles.inputField} onClick={() => setIsCardiacPast(isCardiacPast === true ? false : true)} />
                </div>
            </div>
            <div style={{textAlign: 'left', border: 'none'}}>
                <FaDroplet className={styles.inputImage} />
                <p>Do you have concerns with your blood pressure?</p>
                <div className={styles.check}>
                    <label htmlFor="">Yes</label>
                    <input defaultValue={isBloodPressure} checked={isBloodPressure === true} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setIsBloodPressure(true)} />
                </div>
                <div className={styles.check}>
                    <label htmlFor="">No</label>
                    <input defaultValue={isBloodPressure} checked={isBloodPressure === false} disabled={!isEditable} type="radio" className={styles.inputField} onClick={() => setIsBloodPressure(false)} />
                </div>
            </div>
            
        </form>
        </div>
    </>
  )
}

export default FamilyInfo