import React from 'react'
import styles from './SignUp.module.css'
import SignupIcon from '../../assets/stethoscope.svg'
import SignupImage from '../../assets/signup-image.svg'
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../app/features/users/usersSlice';


const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users)


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const enteredEmail = formData.get('email');
        const enteredPassword = formData.get('password');
        const enteredConfirmPassword = formData.get('confirm-password');
 
        console.log(formData.get('email'))

        const newUser = {
            "Email": enteredEmail, 
            "Password": enteredConfirmPassword
        }
 
        dispatch(addUser(newUser))

        // users.push(JSON.stringify(newUser))

        console.log(newUser);

        navigate('/login')
    }
  return (
    <section>
        <div className={styles.wrapper}>
            <div className={styles.infoSection}>
                <div className={styles.title}>
                    <img src={SignupIcon} className={styles.signupIcon} alt="" />
                    <h1>Sign-up</h1>
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
                    <div>
                        <IoKeyOutline className={styles.inputImage} />
                        <input name='confirm-password' type="password" className={styles.inputField} placeholder='Confirm-Password' />
                    </div>
                    <br />
                    <button className={styles.signupBtn} type='submit'>Sign-up</button>
                </form>
                <br />
                <p>Already have an account? <Link to='/login'><span className={styles.action}>Login</span></Link></p>
            </div>
            <div className={styles.imageSection}>
                <img src={SignupImage} className={styles.signupImage} alt="" />
            </div>
        </div>
    </section>
  )
}

export default SignUp