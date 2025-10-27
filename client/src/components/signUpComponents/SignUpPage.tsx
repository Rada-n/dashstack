import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import SignLayout from "../signLayout/SignLayout";
import SubmitButton from "../submitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const validationSchema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be more then 6 symbols")
    .required("Password is required"),
  terms: yup.boolean().oneOf([true], "You must accept terms"),
});

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", username: "", password: "", terms: false },
  });

  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [successReg, setSuccessReg] = useState([]);

  const onSubmit = async (data) => {
      try {
        const response = await axios.post('http://localhost:8000/api/reg', {
          email: data.email,
          name: data.username,
          password: data.password,
        })

        if (response.status == 200) {
          setSuccessReg(response.data.message)
          navigate('/signin')
        }

      } catch (e) {
        console.error(e);

        const validationErrors = e.response.data.errors;
        console.log(validationErrors)
        setValidationErrors(validationErrors);
      }
  };

  return (
    <SignLayout>
      <h1 className={styles.title}>Create an Account</h1>
      <p className={styles.subtitle}>Create a account to continue</p>
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

        <label htmlFor="username">
          Username:
          <input
            type="text"
            {...register("username")}
            id="username"
            placeholder="Username"
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
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

        <div className={styles.termsContainer}>
          <label htmlFor="terms" className={styles.termsLabel}>
            <input type="checkbox" {...register("terms")} id="terms" />I accept{" "}
            <a href="#">terms and conditions</a>
          </label>
          {errors.terms && (
            <p className={styles.error}>{errors.terms.message}</p>
          )}
        </div>

        {validationErrors.name || validationErrors.email || validationErrors.password &&
          <>
            <p className={styles.error}>{validationErrors?.name[0]}</p>
            <p className={styles.error}>{validationErrors?.password[0]}</p>
            <p className={styles.error}>{validationErrors?.email[0]}</p>
          </>
        }

        {successReg && <p>{successReg}</p>}

        <SubmitButton disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Sign Up"}</SubmitButton>

      </form>
      <p>
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </SignLayout>
  );
};

export default SignUpPage;
