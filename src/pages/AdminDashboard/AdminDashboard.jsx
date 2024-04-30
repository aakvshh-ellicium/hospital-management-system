import React, { useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData, readUserInformation } from "../../app/features/admin/adminSlice";
import { deleteUserPersonalData, readAllPersonalData } from "../../app/features/admin/adminPersonalDataSlice";
import { readAllFamilyInfo } from "../../app/features/admin/adminFamilyDataSlice";
import UserDocuments from "../UserDocuments/UserDocuments";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { usersData } = useSelector((state) => state.admin);
  const {usersPersonalData} = useSelector(state => state.usersPersonalInfo);
  const {usersFamilyData} = useSelector(state => state.usersFamilyInfo)


  useEffect(() => {
    dispatch(readUserInformation());
    dispatch(readAllPersonalData());
    dispatch(readAllFamilyInfo()); 
  }, [dispatch]);

  const handleDelete = (id) => {
    // e.preventDefault();
    dispatch(deleteUserData(id))
    dispatch(readUserInformation());
    console.log(id)
  }

  console.log(usersPersonalData)
  console.log(usersFamilyData)
  console.log(usersData);
  return (
    <div className={styles.wrapper}>
      <h2>Admin Dashboard</h2><br /><br />

      <h2>Users:</h2> <br /><br />
      <div className={styles.grid}>
        <div className={styles.gridHeader}>
          <p>id</p>
          <p>email</p>
          <p>role</p>
          <p>action</p>
        </div>
        <hr />

        {usersData.data?.map(row => {
          return (
            <div className='gridContent'>
              <p>{row.Id}</p>
              <p>{row.Email}</p>
              <p>{row.roles}</p>
              <p onClick={() => handleDelete(row.Id)}>Delete</p>
              {/* <p onClick={handleDelete} id={styles.delete}>Delete</p> */}

            </div>
          )
        })}
        
      </div><br /><br />

      <h2>Personal Data</h2><br /><br />
      <div className={styles.personalInfoGrid}>
        <div className={styles.personalInfoGridHeader}>
          <p>id</p>
          <p>firstname</p>
          <p>lastname</p>
          <p>mobile-number</p>
          <p>date-of-birth</p>
          <p>age</p>
          <p>weight</p>
          <p>height</p>
          <p>country-of-origin</p>
          <p>diabetic</p>
          <p>cardiac-issues</p>
          <p>blood-pressure</p>
          <p>disease-type</p>
          <p>disease-description</p>

        </div>
        <hr />
        {
          usersPersonalData.data?.map(data => {
            return (
              <div className='gridContent2'>
                <p>{data.Id}</p>
                <p>{data.firstName}</p>
                <p>{data.lastName}</p>
                <p>{data.mobileNumber}</p>
                <p>{data.dateOfBirth}</p>
                <p>{data.age}</p>
                <p>{data.weight}</p>
                <p>{data.height}</p>
                <p>{data.countryOfOrigin}</p>
                <p>{data.isDiabetic}</p>
                <p>{data.hasCardiacIssues}</p>
                <p>{data.hasBloodPressureConcerns}</p>
                <p>{data.diseaseType}</p>
                <p>{data.diseaseDescription}</p>

              </div>
            )
          })
        }

      </div><br /><br />

        <h2>Family Data</h2><br /><br />
      <div className={styles.familyInfoGrid}>
        <div className={styles.familyInfoGridHeader}>
            <p>id</p>
            <p>fathers-name</p>
            <p>fathers-age</p>
            <p>fathers-country</p>
            <p>mothers-name</p>
            <p>mothers-age</p>
            <p>mothers-country</p>
            <p>diabetic</p>
            {/* <p>pre-diabetic</p> */}
            <p>cardiac-past</p>
            <p>cardiac-present</p>
            <p>bp</p>
            {/* <p></p> */}
        </div>
        <hr />

        {
          usersFamilyData.data?.map(data => {
            return (
              <div className='gridContent3'>
                <p>{data.Id}</p>
                <p>{data.FathersName}</p>
                <p>{data.FathersAge}</p>
                <p>{data.FathersCountry}</p>
                <p>{data.MothersName}</p>
                <p>{data.mothersAge}</p>
                <p>{data.motherCountry}</p>
                <p>{data.diabetic}</p>
                {/* <p>{data.preDiabetic}</p> */}
                <p>{data.CardiacPast}</p>
                <p>{data.cardiacPresent}</p>
                <p>{data.bloodPressure}</p>
                
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
