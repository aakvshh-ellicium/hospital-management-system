import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { readUserInfo } from "../../app/features/user-info/userInfoSlice";
import { readFamilyInfo } from "../../app/features/familyInfo/familyInfoSlice";
import { readDocuments } from "../../app/features/uploadDocuments/uploadDocumentsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfoData } = useSelector((state) => state.userInfo);
  const { familyInfoData } = useSelector((state) => state.familyInfo);
  const {files} = useSelector((state) => state.uploadDocuments);

  console.log(userInfoData)

  useEffect(() => {
    dispatch(readUserInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(readFamilyInfo());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(readDocuments());
  // }, [dispatch]);

  // console.log(familyInfoData);
  // console.log(userInfoData.data);
  // console.log(userInfoData);
  console.log(familyInfoData)
  // console.log(files)
  return (
    <>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.data}>
        <h2>Hello {userInfoData.data?.map((e) => e.firstName)}</h2>

        <div></div>
      </div>
    </>
  );
};

export default Dashboard;
