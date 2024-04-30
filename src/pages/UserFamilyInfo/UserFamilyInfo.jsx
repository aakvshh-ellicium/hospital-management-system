import React, { useState } from 'react'
import styles from './UserFamilyInfo.module.css'
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
import { useDispatch, useSelector } from 'react-redux';
import { addFamilyInfo } from '../../app/features/familyInfo/familyInfoSlice';
import toast from 'react-hot-toast';

const UserFamilyInfo = () => {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const familyInfo = useSelector((state) => state.familyInfo)
    const [isDiabetic, setIsDiabetic] = useState(false);
    const [isPreDiabetic, setIsPreDiabetic] = useState(false);
    const [isCardiacPast, setIsCardiacPast] = useState(false);
    const [isCardiacPresent, setIsCardiacPresent] = useState(false);
    const [isBloodPressure, setIsBloodPressure] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const familyDataOne = {};

        formData.forEach((value, key) => {
            familyDataOne[key] = value;
        })

        const familyDataTwo = {
            diabetic: isDiabetic,
            preDiabetic: isPreDiabetic,
            CardiacPast: isCardiacPast,
            cardiacPresent: isCardiacPresent,
            bloodPressure: isBloodPressure
        }

        const validationErrors = {};
        const namePattern = /^([a-zA-Z ]){2,30}$/;
        const agePattern = /^(1[8-9]|[2-9][0-9]|90)$/;

        if (!familyDataOne.FathersName.trim()) {
            validationErrors.FathersName = "Fathers Name is required";
            toast.error(validationErrors.FathersName)
        } else if (!namePattern.test(familyDataOne.FathersName)) {
            validationErrors.FathersName = "Fathers Name is not valid";
            toast.error(validationErrors.FathersName)
        }

        if (!familyDataOne.FathersAge.trim()) {
            validationErrors.FathersAge = "Fathers Age is required";
            toast.error(validationErrors.FathersAge)
        } else if (!agePattern.test(familyDataOne.FathersAge)) {
            validationErrors.FathersAge = "Fathers Age is not valid";
            toast.error(validationErrors.FathersAge)
        }

        if (!familyDataOne.FathersCountry.trim()) {
            validationErrors.FathersCountry = "Fathers Country is required";
            toast.error(validationErrors.FathersCountry)
        } else if (!namePattern.test(familyDataOne.FathersCountry)) {
            validationErrors.FathersCountry = "Fathers Country is not valid";
            toast.error(validationErrors.FathersCountry)
        }

        if (!familyDataOne.MothersName.trim()) {
            validationErrors.MothersName = "Mothers Name is required";
            toast.error(validationErrors.MothersName)
        } else if (!namePattern.test(familyDataOne.MothersName)) {
            validationErrors.MothersName = "Mothers Name is not valid";
            toast.error(validationErrors.MothersName)
        }

        if (!familyDataOne.mothersAge.trim()) {
            validationErrors.mothersAge = "Mothers Age is required";
            toast.error(validationErrors.mothersAge)
        } else if (!agePattern.test(familyDataOne.mothersAge)) {
            validationErrors.mothersAge = "Mothers Age is not valid";
            toast.error(validationErrors.mothersAge)
        }

        if (!familyDataOne.motherCountry.trim()) {
            validationErrors.motherCountry = "Mothers Country is required";
            toast.error(validationErrors.motherCountry)
        } else if (!namePattern.test(familyDataOne.motherCountry)) {
            validationErrors.motherCountry = "Mothers Country is not valid";
            toast.error(validationErrors.motherCountry)
        }
        
        if (Object.keys(validationErrors).length === 0){
            const familyData = {...familyDataOne, ...familyDataTwo};
        
            console.log(familyData);

            dispatch(addFamilyInfo(familyData));
            toast.success("Family Info added successfully!")
            navigate('/documents');
        }
        
    }

  return (
    <div className={styles.wrapper}>
            <div className={styles.imageSection}>
                <img src={RegisterImage} className={styles.registerImage} alt="" />
            </div>
    
            <div className={styles.infoSection}>
                <div className={styles.title}>
                    <img src={RegisterIcon} className={styles.registerIcon} alt="" />
                    <h1>Family Info</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <CgRename className={styles.inputImage} />
                        <input name='FathersName' type="text" className={styles.inputField} placeholder="Father's Name" required />
                    </div>
                    <div>
                        <CgRename className={styles.inputImage} />
                        <input name='FathersAge' type="number" className={styles.inputField} placeholder="Father's Age" required />
                    </div>
                    <div>
                        <FaRegFlag className={styles.inputImage} />
                        <input name='FathersCountry' type="text" className={styles.inputField} placeholder="Father's Country" required />
                    </div>
                    <div>
                        <CgRename className={styles.inputImage} />
                        <input name='MothersName' type="text" className={styles.inputField} placeholder="Mother's Name" required />
                    </div>
                    <div>
                        <CgRename className={styles.inputImage} />
                        <input name='mothersAge' type="number" className={styles.inputField} placeholder="Mother's Age" required />
                    </div>
                    <div>
                        <FaRegFlag className={styles.inputImage} />
                        <input name='motherCountry' type="text" className={styles.inputField} placeholder="Mother's Country" required />
                    </div>
                    <div>
                        <GiHospitalCross className={styles.inputImage} />
                        <p>Are you diabetic or pre-diabetic?</p>
                        <div className={styles.check}>
                            <label htmlFor="">Diabetic</label>
                            <input value={isDiabetic} checked={isDiabetic === true} type="checkbox" className={styles.inputField} onClick={() => setIsDiabetic(isDiabetic === true ? false : true)} />
                        </div>
                        <div className={styles.check}>
                            <label htmlFor="">Pre-Diabetic</label>
                            <input value={isPreDiabetic} checked={isPreDiabetic === true} type="checkbox" className={styles.inputField} onClick={() => setIsPreDiabetic(isPreDiabetic === true ? false : true)} />
                        </div>
                    </div>
                    
                    
                    <div style={{textAlign: 'left', border: 'none'}}>
                        <FaHeartCircleExclamation className={styles.inputImage} />
                        <p>Have you suffered any cardiac related issues in the past or are suffering currently?</p>
                        <div className={styles.check}>
                            <label htmlFor="">Cardiac-Past</label>
                            <input value={isCardiacPast} type="checkbox" checked={isCardiacPast === true} className={styles.inputField} onClick={() => setIsCardiacPast(isCardiacPast === true ? false : true)} />
                        </div>
                        <div className={styles.check}>
                            <label htmlFor="">Cardiac-Present</label>
                            <input value={isCardiacPresent} type="checkbox" checked={isCardiacPresent === true} className={styles.inputField} onClick={() => setIsCardiacPresent(isCardiacPresent === true ? false : true)} />
                        </div>
                    </div>
                    <div style={{textAlign: 'left', border: 'none'}}>
                        <FaDroplet className={styles.inputImage} />
                        <p>Do you have concerns with your blood pressure?</p>
                        <div className={styles.check}>
                            <label htmlFor="">Yes</label>
                            <input value={isBloodPressure} checked={isBloodPressure === true} type="radio" className={styles.inputField} onClick={() => setIsBloodPressure(true)} />
                        </div>
                        <div className={styles.check}>  
                            <label htmlFor="">No</label>
                            <input value={isBloodPressure} checked={isBloodPressure === false} type="radio" className={styles.inputField} onClick={() => setIsBloodPressure(false)} />
                        </div>
                    </div>

                    <button type='submit' className={styles.registerBtn}>Register</button>
                    
                </form>

            </div>
        </div>
  )
}

export default UserFamilyInfo