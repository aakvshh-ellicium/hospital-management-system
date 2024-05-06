import React from 'react'
import styles from './ListInputs.module.css'
import { CgRename } from "react-icons/cg";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaWeightScale } from "react-icons/fa6";
import { GiBodyHeight } from "react-icons/gi";
import { FaRegFlag } from "react-icons/fa6";


const ListInputs = (props) => {

    const inputFields = [
        {
            name: 'firstName',
            type: 'text',
            placeholder: 'First Name',
            icon: CgRename
        },
        {
            name: 'lastName',
            type: 'text',
            placeholder: 'Last Name',
            icon: CgRename
        },
        {
            name: 'mobileNumber',
            type: 'number',
            placeholder: 'Phone',
            icon: FaPhone
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            placeholder: 'Date of birth',
            icon: MdOutlineDateRange
        },
        {
            name: 'weight',
            type: 'text',
            placeholder: 'Weight',
            icon: FaWeightScale
        },
        {
            name: 'height',
            type: 'text',
            placeholder: 'height',
            icon: GiBodyHeight
        },
        {
            name: 'countryOfOrigin',
            type: 'text',
            placeholder: 'Country',
            icon: FaRegFlag
        }
    ]
  return (
    <>
        {
            inputFields.map(input => {
                return (
                    <div key={input.name}>
                        <input.icon className={styles.inputImage} />
                        <input
                        name={input.name}
                        type={input.type}
                        className={styles.inputField}
                        placeholder={input.placeholder}
                        required
                        />
                    </div>
                )
            })
        }
          
          
    </>
  )
}

export default ListInputs