import React, { useState } from 'react'
import styles from './Login.module.css'
import LoginIcon from '../../assets/stethoscope.svg'
import LoginImage from '../../assets/login-image.svg'
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { readUserInformation } from '../../app/features/admin/adminSlice';


const Login = () => {
    const [error, setError] = useState("Error");
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const {usersData} = useSelector(state => state.admin)

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const enteredEmail = formData.get('email');
        const enteredPassword = formData.get('password');

        console.log(enteredPassword)
        console.log(enteredEmail)

        // console.log(usersData)

        
        axios.post('http://127.0.0.1:3000/api/login', {
            Email: enteredEmail,
            Password: enteredPassword
        }).then((response) => {
            console.log(response);
            const {token} = response.data;
            localStorage.setItem('token', token);
            if (enteredEmail === 'admin@gmail.com' && enteredPassword === '1234'){
                navigate('/dashboard/admin')
            } else {
                navigate('/personal-info');
            }
        }, (error) => {
            console.log(error);
        });
        

        
    }


  return (
    <section>
        <div className={styles.wrapper}>
            <div className={styles.infoSection}>
                <div className={styles.title}>
                    <img src={LoginIcon} className={styles.loginIcon} alt="" />
                    <h1>Login</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <CiMail className={styles.inputImage} />
                        <input name='email' type="email" className={styles.inputField} placeholder='Email Address' />
                    </div>
                    <div>
                        <IoKeyOutline className={styles.inputImage} />
                        <input name='password' type="password" className={styles.inputField} placeholder='Password' />
                    </div>
                    <br />
                    <button className={styles.loginBtn} type='submit'>Login</button>
                </form>
                <br />
                <p>Don't have an account? <Link to='/sign-up'><span className={styles.action}>Sign-up</span></Link></p>
            </div>
            <div className={styles.imageSection}>
                <img src={LoginImage} className={styles.loginImage} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Login