import React, { useState } from 'react'
import styles from './UserInfo.module.css'
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
import { addUserInfo } from '../../app/features/user-info/userInfoSlice';
import toast from 'react-hot-toast';

const UserInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfoData = useSelector((state) => state.userInfo.userInfoData);
    const [isDiabetic, setIsDiabetic] = useState(false);
    const [hasCardiacIssues, setHasCardiacIssues] = useState(false);
    const [hasBloodPressureConcerns, setHasBloodPressureConcerns] = useState(false);
    const [diseaseType, setDiseaseType] = useState('type-1')
    const [diseaseDescription, setDiseaseDescription] = useState('')
    // const [userData, setUserData] = useState({})
    
    const handleCategoryChange = (e) => {
        setDiseaseType(e.target.value);
        console.log(diseaseType);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        

        const formData = new FormData(e.currentTarget);

        const userDataOne = {};
        formData?.forEach((value, key) => {
            userDataOne[key] = value;
        })

        

        const userDataTwo = {
            isDiabetic,
            hasCardiacIssues,
            hasBloodPressureConcerns,
            diseaseType,
            diseaseDescription
        }

        const validationErrors = {};

        // const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z]{2,}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i;
        const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!userDataOne.mobileNumber.trim()) {
            validationErrors.phone = "Phone number is required";
            toast.error(validationErrors.phone)
        } else if (!phonePattern.test(userDataOne.mobileNumber)) {
            validationErrors.phone = "Phone is not valid";
            toast.error(validationErrors.phone)
        }

        if (Object.keys(validationErrors).length === 0){
            const userData = ({...userDataOne, ...userDataTwo})
            // let something = Object.keys(userData);

            // console.log(something);
            console.log(userData)
            dispatch(addUserInfo(userData))

            console.log(userData)
            // alert(userData.firstName)

            navigate('/family-info')
        }
        
        

    }
  return (
        <div className={styles.wrapper}>
            {/* <h2>Register</h2> */}
            <div className={styles.imageSection}>
                <img src={RegisterImage} className={styles.registerImage} alt="" />
            </div>
    
            <div className={styles.infoSection}>
                <div className={styles.title}>
                    <img src={RegisterIcon} className={styles.registerIcon} alt="" />
                    <h1>Personal Info</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <CgRename className={styles.inputImage} />
                        <input name="firstName" type="text" className={styles.inputField} placeholder='First Name' />
                    </div>
                    <div>
                        <CgRename className={styles.inputImage} />
                        <input name="lastName" type="text" className={styles.inputField} placeholder='Last Name' />
                    </div>
                    <div>
                        <FaPhone className={styles.inputImage} />
                        <input name="mobileNumber" type="number" className={styles.inputField} placeholder='Phone' />
                    </div>
                    <div>
                        <MdOutlineDateRange className={styles.inputImage} />
                        <input name="dateOfBirth" type="date" className={styles.inputField} placeholder='Date of Birth' />
                    </div>
                    <div>
                        <FaWeightScale className={styles.inputImage} />
                        <input name="weight" type="text" className={styles.inputField} placeholder='Weight' />
                    </div>
                    <div>
                        <GiBodyHeight className={styles.inputImage} />
                        <input name="height" type="text" className={styles.inputField} placeholder='Height' />
                    </div>
                    <div>
                        <FaRegFlag className={styles.inputImage} />
                        <input name="countryOfOrigin" type="text" className={styles.inputField} placeholder='Country' />
                    </div>
                    <div>
                        <GiHospitalCross className={styles.inputImage} />
                        <p>Are you diabetic or pre-diabetic?</p>
                        <div className={styles.check}>
                            <label htmlFor="">Yes</label>
                            <input value={isDiabetic} type="radio" className={styles.inputField} onClick={() => setIsDiabetic(true)} />
                        </div>
                        <div className={styles.check}>
                            <label htmlFor="">No</label>
                            <input value={isDiabetic} type="radio" className={styles.inputField} onClick={() => setIsDiabetic(false)}  />
                        </div>
                    </div>
                    <div style={{textAlign: 'left', border: 'none'}}>
                        <FaHeartCircleExclamation className={styles.inputImage} />
                        <p>Have you suffered any cardiac related issues in the past or are suffering currently?</p>
                        <div className={styles.check}>
                            <label htmlFor="">Yes</label>
                            <input value={hasCardiacIssues} type="radio" className={styles.inputField} onClick={() => setHasCardiacIssues(true)}  />
                        </div>
                        <div className={styles.check}>
                            <label htmlFor="">No</label>
                            <input value={hasCardiacIssues} type="radio" className={styles.inputField} onClick={() => setHasCardiacIssues(false)} />
                        </div>
                    </div>
                    <div style={{textAlign: 'left', border: 'none'}}>
                        <FaDroplet className={styles.inputImage} />
                        <p>Do you have concerns with your blood pressure?</p>
                        <div className={styles.check}>
                            <label htmlFor="">Yes</label>
                            <input value={hasBloodPressureConcerns} type="radio" className={styles.inputField} onClick={() => setHasBloodPressureConcerns(true)} />
                        </div>
                        <div className={styles.check}>
                            <label htmlFor="">No</label>
                            <input value={hasBloodPressureConcerns} type="radio" className={styles.inputField} onClick={() => setHasBloodPressureConcerns(false)} />
                        </div>
                    </div>
                    <div style={{textAlign: 'left', border: 'none'}}>
                        <label htmlFor="">Disease Type</label>
                        <select value={diseaseType} id="" onChange={handleCategoryChange} className={styles.dropdown}>
                            <option className={styles.option} value="type-1">Type 1</option>
                            <option className={styles.option} value="type-2">Type 2</option>
                            <option className={styles.option} value="type-3">Type 3</option>
                            <option className={styles.option} value="type-4">Type 4</option>
                        </select>
                    </div>
                    <textarea value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} id="" cols="30" rows="8" placeholder='Enter your Disease description' className={styles.diseaseDescription}></textarea>

                    <button type='submit' className={styles.registerBtn}>Register</button>
                </form>

                
                    
            </div>
        </div>
  )
}

export default UserInfo