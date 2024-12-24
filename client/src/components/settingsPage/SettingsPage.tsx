import React, { ChangeEvent, useState } from "react";
import Layout from "../layout/Layout";
import { UserData, useLocalStrorage } from "../../hooks/useLocalStrorage";
import SubmitButton from "../submitButton/SubmitButton";
import Avatar from "../avatar/Avatar";
import styles from "./SettingsPage.module.css";

const SettingsPage: React.FC = () => {
  const { setValue, storedValue: currentUserData } = useLocalStrorage(
    "currentUser",
    {}
  );
  const [newData, setNewData] = useState<UserData>({
    username: currentUserData.username || "",
    email: currentUserData.email || "",
    password: currentUserData.password || "",
    image: currentUserData?.image || "",
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const handleInputValues = (e: ChangeEvent<HTMLInputElement>):void => {
    setNewData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setIsSubmit(false)
  };

  const handleSubmitForm = (e: ChangeEvent):void => {
    e.preventDefault();

    setValue(newData);
    setIsSubmit(true)
  };

  return (
    <Layout>
      <h1>Change Your Profile</h1>
      <section className={styles.formContainer}>
        <Avatar />
        <h2>{currentUserData.username}</h2>
        <form onSubmit={handleSubmitForm} className={styles.form}>
          <div className={styles.formInner}>
              <label>
                Your username:
                <input
                  type="text"
                  name="username"
                  placeholder="Input username"
                  value={newData.username}
                  onInput={handleInputValues}
                />
              </label>
              <label>
                Your email:
                <input
                  type="email"
                  name="email"
                  placeholder="Input email"
                  value={newData.email}
                  onInput={handleInputValues}
                />
              </label>
              <label>
                Your password:
                <input
                  type="password"
                  name="password"
                  placeholder="Input password"
                  value={newData.password}
                  onInput={handleInputValues}
                />
              </label>
              <label>
                Your image URL:
                <input
                  type="text"
                  name="image"
                  value={newData.image}
                  onInput={handleInputValues}
                />
              </label>
          </div>
          <div className={styles.buttonContainer}>
              <SubmitButton>Save</SubmitButton>
              {isSubmit && <p className={styles.success}>Profile has been updated!</p>}
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default SettingsPage;
