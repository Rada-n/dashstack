import React, { ChangeEvent, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { UserData } from "../../hooks/useLocalStrorage";
import SubmitButton from "../submitButton/SubmitButton";
import Avatar from "../avatar/Avatar";
import styles from "./SettingsPage.module.css";
import Loading from "../loading/Loading";
import api from "../../api/axiosInstance";
import { useUser } from "../../providers/UserProvider";

const SettingsPage: React.FC = () => {
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [newData, setNewData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/user', { withCredentials: true,  });
        setCurrentUserData(res.data.data);
        setNewData({
          name: res.data.data.name || "",
          email: res.data.data.email || "",
          image: res.data.data.image || "",
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  const handleInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setNewData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setIsSubmit(false);
    setError(null);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await api.post(
        '/api/user?_method=PUT',
        newData,
        { withCredentials: true }
      );
      setCurrentUserData(res.data.data);
      setCurrentUser(res.data.data);
      setIsSubmit(true);
    } catch (e) {
      setError(e.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUserData) return <Loading />;

  return (
    <Layout>
      <h1>Change Your Profile</h1>
      <section className={styles.formContainer}>
        <Avatar image={currentUserData.image} />
        <h2 className={styles.username}>{currentUserData.name}</h2>
        <form onSubmit={handleSubmitForm} className={styles.form}>
          <div className={styles.formInner}>
            <label>
              Your username:
              <input
                type="text"
                name="name"
                placeholder="Input username"
                value={newData.name}
                onChange={handleInputValues}
              />
            </label>
            <label>
              Your email:
              <input
                type="email"
                name="email"
                placeholder="Input email"
                value={newData.email}
                onChange={handleInputValues}
              />
            </label>
            <label>
              Your password:
              <input
                type="password"
                name="password"
                placeholder="**********"
                value={newData.password}
                onChange={handleInputValues}
              />
            </label>
            <label>
              Your image URL:
              <input
                type="text"
                name="image"
                value={newData.image}
                onChange={handleInputValues}
              />
            </label>
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.buttonContainer}>
              <SubmitButton disabled={isLoading}>Save</SubmitButton>
            </div>
            {isSubmit && <p className={styles.success}>Profile has been updated!</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default SettingsPage;

