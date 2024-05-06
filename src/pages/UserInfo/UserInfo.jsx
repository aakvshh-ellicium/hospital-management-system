import React, { useState } from "react";
import styles from "./UserInfo.module.css";
import RegisterImage from "../../assets/signup-image.svg";
import RegisterIcon from "../../assets/stethoscope.svg";
import { GiHospitalCross } from "react-icons/gi";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../../app/features/user-info/userInfoSlice";
import toast from "react-hot-toast";
import ListInputs from "../../components/PersonalInfo/ListInputs";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfo.userInfoData);
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [hasCardiacIssues, setHasCardiacIssues] = useState(false);
  const [hasBloodPressureConcerns, setHasBloodPressureConcerns] =
    useState(false);
  const [diseaseType, setDiseaseType] = useState("type-1");
  const [diseaseDescription, setDiseaseDescription] = useState("");

  const handleCategoryChange = (e) => {
    setDiseaseType(e.target.value);
    console.log(diseaseType);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userDataOne = {};
    formData?.forEach((value, key) => {
      userDataOne[key] = value;
    });

    const userDataTwo = {
      isDiabetic,
      hasCardiacIssues,
      hasBloodPressureConcerns,
      diseaseType,
      diseaseDescription,
    };

    const validationErrors = {};
    const namePattern = /^([a-zA-Z ]){2,30}$/;
    const weightPattern = /^(0|[1-9]\d*)(,\d+)?$/;
    const heightPattern = /\d-\d$/;
    const phonePattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!userDataOne.mobileNumber.trim()) {
      validationErrors.phone = "Phone number is required";
      toast.error(validationErrors.phone);
    } else if (!phonePattern.test(userDataOne.mobileNumber)) {
      validationErrors.phone = "Phone is not valid";
      toast.error(validationErrors.phone);
    }

    if (!userDataOne.firstName.trim()) {
      validationErrors.firstName = "First Name is required";
      toast.error(validationErrors.firstName);
    } else if (!namePattern.test(userDataOne.firstName)) {
      validationErrors.firstName = "First Name is not valid";
      toast.error(validationErrors.firstName);
    }

    if (!userDataOne.lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
      toast.error(validationErrors.lastName);
    } else if (!namePattern.test(userDataOne.lastName)) {
      validationErrors.lastName = "Last Name is not valid";
      toast.error(validationErrors.lastName);
    }

    if (!userDataOne.weight.trim()) {
      validationErrors.weight = "Weight is required";
      toast.error(validationErrors.weight);
    } else if (!weightPattern.test(userDataOne.weight)) {
      validationErrors.weight = "Weight is not valid";
      toast.error(validationErrors.weight);
    }

    if (!userDataOne.height.trim()) {
      validationErrors.height = "Height is required";
      toast.error(validationErrors.height);
    } else if (!heightPattern.test(userDataOne.height)) {
      validationErrors.height = "Height is not valid, enter value in x-y";
      toast.error(validationErrors.height);
    }

    if (!userDataOne.countryOfOrigin.trim()) {
      validationErrors.countryOfOrigin = "Country name is required";
      toast.error(validationErrors.countryOfOrigin);
    } else if (!namePattern.test(userDataOne.countryOfOrigin)) {
      validationErrors.countryOfOrigin = "Country name is not valid";
      toast.error(validationErrors.countryOfOrigin);
    }

    if (Object.keys(validationErrors).length === 0) {
      const userData = { ...userDataOne, ...userDataTwo };

      dispatch(addUserInfo(userData));
      toast.success("Personal Info added successfully");

      navigate("/family-info");
    }
  };
  return (
    <div className={styles.wrapper}>
      {/* <h2>Register</h2> */}
      <div className={styles.imageSection}>
        <img src={RegisterImage} className={styles.registerImage} alt="" />
      </div>

      <div className={styles.infoSection}>
        <div className={styles.title}>
          <img src={RegisterIcon} className={styles.registerIcon} alt="" />
          <h1>Personal Info</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ListInputs />

          <aside id={styles.align}>
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <GiHospitalCross className={styles.inputImage} />
              <p>Are you diabetic or pre-diabetic?</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.check}>
                <label htmlFor="">Yes</label>
                <input
                  value={isDiabetic}
                  checked={isDiabetic && true}
                  type="radio"
                  className={styles.inputField}
                  onClick={() => setIsDiabetic(true)}
                  required
                />
              </div>
              <div className={styles.check}>
                <label htmlFor="">No</label>
                <input
                  value={isDiabetic}
                  checked={!isDiabetic && true}
                  type="radio"
                  className={styles.inputField}
                  onClick={() => setIsDiabetic(false)}
                  required
                />
              </div>
            </div>
          </aside>
          <aside id={styles.align}>
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <FaHeartCircleExclamation className={styles.inputImage} />
              <p>
                Have you suffered any cardiac related issues in the past or are
                suffering currently?
              </p>
            </div>
            <div className={styles.check}>
              <label htmlFor="">Yes</label>
              <input
                value={hasCardiacIssues}
                checked={hasCardiacIssues && true}
                type="radio"
                className={styles.inputField}
                onClick={() => setHasCardiacIssues(true)}
                required
              />
            </div>
            <div className={styles.check}>
              <label htmlFor="">No</label>
              <input
                value={hasCardiacIssues}
                checked={!hasCardiacIssues && true}
                type="radio"
                className={styles.inputField}
                onClick={() => setHasCardiacIssues(false)}
                required
              />
            </div>
          </aside>
          <aside id={styles.align}>
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
              <FaDroplet className={styles.inputImage} />
              <p>Do you have concerns with your blood pressure?</p>
            </div>
            <div className={styles.check}>
              <label htmlFor="">Yes</label>
              <input
                value={hasBloodPressureConcerns}
                checked={hasBloodPressureConcerns && true}
                type="radio"
                className={styles.inputField}
                onClick={() => setHasBloodPressureConcerns(true)}
                required
              />
            </div>
            <div className={styles.check}>
              <label htmlFor="">No</label>
              <input
                value={hasBloodPressureConcerns}
                checked={!hasBloodPressureConcerns && true}
                type="radio"
                className={styles.inputField}
                onClick={() => setHasBloodPressureConcerns(false)}
                required
              />
            </div>
          </aside>
          <aside style={{ textAlign: "left", margin: "0.5em 1em" }}>
            <label htmlFor="">Disease Type</label>
            <select
              value={diseaseType}
              id=""
              onChange={handleCategoryChange}
              className={styles.dropdown}
              required
            >
              <option className={styles.option} value="type-1">
                Type 1
              </option>
              <option className={styles.option} value="type-2">
                Type 2
              </option>
              <option className={styles.option} value="type-3">
                Type 3
              </option>
              <option className={styles.option} value="type-4">
                Type 4
              </option>
            </select>
          </aside>
          <textarea
            value={diseaseDescription}
            onChange={(e) => setDiseaseDescription(e.target.value)}
            id=""
            cols="30"
            rows="8"
            placeholder="Enter your Disease description"
            className={styles.diseaseDescription}
            required
          ></textarea>

          <button type="submit" className={styles.registerBtn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
