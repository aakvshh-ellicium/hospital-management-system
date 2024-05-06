import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserData,
  readUserInformation,
} from "../../app/features/admin/adminSlice";
import {
  deleteUserPersonalData,
  readAllPersonalData,
} from "../../app/features/admin/adminPersonalDataSlice";
import { readAllFamilyInfo } from "../../app/features/admin/adminFamilyDataSlice";
import UserDocuments from "../UserDocuments/UserDocuments";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/AdminDashboard/Modal";
import Pagination from "../../components/AdminDashboard/Pagination";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { usersData } = useSelector((state) => state.admin);
  const { usersPersonalData } = useSelector((state) => state.usersPersonalInfo);
  const { usersFamilyData } = useSelector((state) => state.usersFamilyInfo);
  const [searchVal, setSearchVal] = useState("");
  const [data, setData] = useState(usersData.data);
  const [sortType, setSortType] = useState("ascending");
  const [selectedOption, setSelectedOption] = useState('serial-number')
  const [viewId, setViewId] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(5);

  useEffect(() => {
    dispatch(readUserInformation());
  }, [dispatch]); 

  // const handleDelete = (id) => {
  //   // e.preventDefault();
  //   dispatch(deleteUserData(id));
  //   dispatch(readUserInformation());
  //   // console.log(id)
  // };

  useEffect(() => {
    const filteredUsers = usersData.data?.filter((user) =>
      user.Email.includes(searchVal)
    );

    setData(filteredUsers);
  }, [searchVal]);

  const handleClick = (e) => {
    setSortType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedOption(e.target.value)
    
  };

  const handlePostsChange = (e) => {
    setpostsPerPage(e.target.value);
  }

  const handleModalClick = (row) => {
    setViewId(row.Id);

  }


  useEffect(() => {
    console.log(sortType)
    console.log(selectedOption)

    if (selectedOption === "serial-number") {
      const sortById =
        sortType === "ascending"
          ? [...data].sort((a, b) => (a.Id > b.Id ? 1 : -1))
          : [...data].sort((a, b) => (b.Id > a.Id ? 1 : -1));
        // console.log(sortById)
      setData(sortById);
    }
    if (selectedOption === "email") {
      const sortByEmail =
        sortType === "ascending"
          ? [...data].sort((a, b) => (a.Email > b.Email ? 1 : -1))
          : [...data].sort((a, b) => (b.Email > a.Email ? 1 : -1));
      setData(sortByEmail);
    } 
    if (selectedOption === "role") {
      const sortByRoles =
        sortType === "ascending"
          ? [...data].sort((a, b) => (a.roles > b.roles ? 1 : -1))
          : [...data].sort((a, b) => (b.roles > a.roles ? 1 : -1));
        // console.log(sortByRoles)
      setData(sortByRoles);
    }

  }, [sortType, selectedOption, viewId])

  const lastUserIndex = currentPage * postsPerPage;
  const firstUserIndex = lastUserIndex - postsPerPage;

  const currentPosts = data.slice(firstUserIndex, lastUserIndex);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Admin Dashboard</h2>
        <input
          type="text"
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
          placeholder="Search by email"
          className={styles.searchInput}
        />
      </div>
      <br />
      <div className={styles.filters}>
        <p>Showing {postsPerPage} of {data.length} records</p>
        <div className={styles.filter}>
          <label htmlFor="">Sort by</label>
          <select
            name=""
            defaultValue='serial-number'
            id=""
            className={styles.dropdown}
            onChange={handleSortChange}
          >
            <option className={styles.option} value={'serial-number'} >
              Serial number
            </option>
            <option className={styles.option} value={'email'} >
              Email
            </option>
            <option className={styles.option} value={'role'} >
              Role
            </option>
          </select>
        </div>
        <div className={styles.filter}>
          <div className={styles.radio}>
            <label htmlFor="">Ascending</label>
            <input
              type="radio"
              name="sort"
              id=""
              defaultChecked={sortType ==="ascending"}
              value={"ascending"}
              onClick={handleClick}
            />
          </div>
          <div className={styles.radio}>
            <label htmlFor="">Descending</label>
            <input
              type="radio"
              name="sort"
              id=""
              defaultChecked={sortType === 'descending'}
              value={"descending"}
              onClick={handleClick}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label htmlFor="">Number of records</label>
          <select name="" id="" className={styles.dropdown} onChange={handlePostsChange}>
            <option className={styles.option} value={5}>
              5
            </option>
            <option className={styles.option} value={10}>
              10
            </option>
            <option className={styles.option} value={15}>
              15
            </option>
            <option className={styles.option} value={20}>
              20
            </option>
            <option className={styles.option} value={30}>
              30
            </option>
          </select>
        </div>
      </div>
      <br />
      {/* <h2>Users:</h2> <br /><br /> */}
      <div className={styles.grid}>
        <div className={styles.gridHeader}>
          <p>Sr.no</p>
          <p>Email</p>
          <p>Role</p>
          <p>Profile</p>
        </div>
        <hr />

        {data.length > 0 &&
          currentPosts?.map((row) => {
            return (
              <div key={row.Id} className="gridContent">
                <p>{row.Id}</p>
                <p>{row.Email}</p>
                <p>{row.roles}</p>
                <p onClick={() => handleModalClick(row)} className={styles.modal}>View</p>
                
                
              </div>
            );
          })}
          {viewId && <Modal id={viewId} data={usersFamilyData.data} onClose={() => setViewId(null)} />}
      </div>
      <br />
      <div className={styles.pagination}>
      <Pagination totalPosts={data.length} postsPerPage={postsPerPage} setCurrentPage={setcurrentPage} />
      </div>
    </div>
  );
};

export default AdminDashboard;
