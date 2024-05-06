import React, {useState} from 'react'
import styles from './SignUp.module.css'
import SignupIcon from '../../assets/stethoscope.svg'
import SignupImage from '../../assets/signup-image.svg'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../app/features/users/usersSlice';
import toast from 'react-hot-toast';

import InputField from '../../components/SignUp/InputField';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    

    const handleClick = () => {
        setShowPassword(!showPassword);

        // showPassword ? setType('text') : setType('password');
        console.log(showPassword);
    }

    const handleClickConfirm = () => {
        setShowConfirmPassword(!showConfirmPassword);

        // showPassword ? setType('text') : setType('password');
        // console.log(showPassword);
    }

    

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

        const validationErrors = {};

        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z]{2,}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i;
        const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (enteredPassword !== enteredConfirmPassword){
            validationErrors.passwordError = "Both passwords must be same"
            toast.error("Both passwords must be same")
        }
        if (!enteredEmail.trim()) {
            validationErrors.email = "Email is required";
            toast.error(validationErrors.email);

        } else if (!emailPattern.test(enteredEmail)) {
            validationErrors.email = "Email is not valid";
            toast.error(validationErrors.email);

        }
        if (!enteredPassword.trim()) {
            validationErrors.password = "Password is required";
            toast.error(validationErrors.password);

        } 
        
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            dispatch(addUser(newUser))

        // users.push(JSON.stringify(newUser))

            console.log(newUser);
            toast.success("User registered successfully")
            navigate('/login')
        }
 
        
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
                    <InputField />
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