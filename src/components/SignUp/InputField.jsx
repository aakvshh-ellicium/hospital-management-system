import React from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import styles from './InputField.module.css'

const InputField = ({showPassword, showConfirmPassword, handleClick, handleClickConfirm}) => {

    const inputFields = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email Address',
            eyeButton: false,
            icon: CiMail
        },
        {
            name: 'password',
            type: showPassword ? 'text' : 'password',
            placeholder: 'Password',
            eyeButton: true,
            state: showPassword,
            function: handleClick,
            icon: IoKeyOutline
        },
        {
            name: 'confirm-password',
            type: showConfirmPassword ? 'text' : 'password',
            placeholder: 'Confirm-Password',
            eyeButton: true,
            state: showConfirmPassword,
            function: handleClickConfirm,
            icon: IoKeyOutline
        }
    ]

  return (
    <>
        {
            inputFields.map(input => {
                return (
                    <div key={input.name}>
                        <div className={styles.inputPassword}>
                            <input.icon className={styles.inputImage} />
                            <input name={input.name} type={input.type} className={styles.inputField} placeholder={input.placeholder} />
                        </div>
                        {
                            input.eyeButton && (
                                <div style={{display: 'flex'}} onClick={input.function}>
                                    {input.state ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
    </>
  )
}

export default InputField