import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import SignLayout from "../signLayout/SignLayout";
import SubmitButton from "../submitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalStrorage } from "../../hooks/useLocalStrorage";

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
  const { storedValue, setValue: setLocalStorageValue } = useLocalStrorage(
    "users",
    {}
  );
  const [sameEmail, setSameEmail] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!Object.keys(storedValue).includes(data.email)) {
      setLocalStorageValue({ [data.email]: data });
      setSameEmail(false);
      navigate("/signin");
    } else {
      setSameEmail(true);
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

        {sameEmail && (
          <p className={styles.error}>This email has been already used</p>
        )}

        <SubmitButton disabled={isSubmitting}>Sign Up</SubmitButton>

        {isSubmitting && <p>Отправка...</p>}
      </form>
      <p>
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </SignLayout>
  );
};

export default SignUpPage;
