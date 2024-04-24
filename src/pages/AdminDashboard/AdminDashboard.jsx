import React, { useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { readUserInformation } from "../../app/features/admin/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { usersData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(readUserInformation());
  }, [dispatch]);

  console.log(usersData);
  return (
    <div className={styles.wrapper}>
      <h2>Admin Dashboard</h2><br /><br />

      <div className={styles.grid}>
        <div className={styles.gridHeader}>
          <p>id</p>
          <p>email</p>
          <p>role</p>
        </div>
        <hr />

        {usersData.data.map(row => {
          return (
            <div className='gridContent'>
              <p>{row.Id}</p>
              <p>{row.Email}</p>
              <p>{row.roles}</p>
            </div>
          )
        })}
        
      </div>
    </div>
  );
};

export default AdminDashboard;
