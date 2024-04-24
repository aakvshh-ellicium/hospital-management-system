import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    console.log(path)
    const navigate = useNavigate();

    // const [active, setActive] = useState('');

    const handleDashboardClick = (active) => {

      navigate('/dashboard')
      // setActive('dashboard');
      console.log(active)
    }

    const handlePersonalInfoClick = (e) => {
      e.preventDefault();
      // setActive('personal-info')
      navigate('/user-personal-info')
      // setActive('personal-info')
    }

    const handleFamilyInfoClick = () => {
      navigate('/user-family-info')
      // setActive('family-info')
    }

    const handleDocumentsClick = () => {
      navigate('/user-documents')
      // setActive('documents')
    }

  return (
    // <section>
        <div className={styles.wrapper}>
            <h2 style={{padding: '1em 1.5em'}}>Forms</h2><br /><br />
            <div onClick={handleDashboardClick} className={`option ${path==='/dashboard' && 'active'}`}>
                <MdOutlineSpaceDashboard className={styles.optionImage} />
                <p>Dashboard</p>
            </div>
            <div onClick={handlePersonalInfoClick} className={`option ${path==='/user-personal-info' && 'active'}`}>
                <MdOutlineSpaceDashboard className={styles.optionImage} />
                <p>Personal Info</p>
            </div>
            <div onClick={handleFamilyInfoClick} className={`option ${path==='/user-family-info' && 'active'}`}>
                <MdOutlineSpaceDashboard className={styles.optionImage} />
                <p>Family Info</p>
            </div>
            <div onClick={handleDocumentsClick} className={`option ${path==='/user-documents' && 'active'}`}>
                <MdOutlineSpaceDashboard className={styles.optionImage} />
                <p>Documents</p>
            </div>

            
        </div>
    // </section>
  )
}

export default Sidebar