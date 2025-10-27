import React, { useState } from "react";
import SignLayout from "../signLayout/SignLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";
import SubmitButton from "../submitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { setCookie } from 'react-use-cookie';
import { useUser } from "../../providers/UserProvider";

const validationSchema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be more then 6 symbols")
    .required("Password is required"),
});

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const [isWrongData, setIsWrongData] = useState<boolean>(false);
  const [validationError, setValidationError] = useState('');
  const { refreshUser } = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        setIsWrongData(false);
        console.log(response.data)
        setCookie('authToken', response.data.token);
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
        await refreshUser();
      } else {
        setIsWrongData(true);
      }
    } catch (e) {
      console.error(e);

      const validationErrors = e.response.data.message;
      setValidationError(validationErrors);
    }
  };

  return (
    <SignLayout>
      <h1 className={styles.title}>Login to Account</h1>
      <p className={styles.subtitle}>
        Please enter your email and password to continue
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="email">
          Email address:
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="esteban_schiller@gmail.com"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>

        <label htmlFor="password">
          <div className={styles.labelPassword}>
            <span>Password:</span>
            <span>Forget password?</span>
          </div>
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="&#183;&#183;&#183;&#183;&#183;&#183;"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </label>

        <div className={styles.rememberPassContainer}>
          <input type="checkbox" {...register("remember")} /> Remember Password
        </div>

        <SubmitButton disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Sign In"}</SubmitButton>

        {isWrongData && (
          <p className={styles.error}>Wrong password or email!</p>
        )}

        {validationError && <p className={styles.error}>{validationError}</p>}

      </form>
      <p>
        Don’t have an account? <Link to="/signup">Create Account</Link>
      </p>
    </SignLayout>
  );
};

export default SignInPage;
