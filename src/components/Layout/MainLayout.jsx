import React from 'react'
import styles from './MainLayout.module.css'
import Sidebar from '../Sidebar/Sidebar'

const MainLayout = ({children}) => {
  return (
    <>
    <div className={styles.sidebar}>
        <Sidebar />
    </div>
    <div className={styles.data}>
        {children}
    </div>
    </>
  )
}

export default MainLayout