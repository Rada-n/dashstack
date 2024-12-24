import React, { useEffect, useState } from "react";
import SignLayout from "../signLayout/SignLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";
import SubmitButton from "../submitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalStrorage } from "../../hooks/useLocalStrorage";
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
  const { storedValue: users } = useLocalStrorage("users", {});
  const navigate = useNavigate();
  const [isWrongData, setIsWrongData] = useState<boolean>(false);
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);
  const { setCurrentUser } = useUser();

  const onSubmit = (data) => {
    const user = users[data.email];
    if (data.password === user.password && user) {
      setIsWrongData(false);
      setCurrentUser(user);
      navigate("/dashboard");
    } else {
      setIsWrongData(true);
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

        {isWrongData && (
          <p className={styles.error}>Wrong password or email!</p>
        )}

        <SubmitButton disabled={isSubmitting}>Sign In</SubmitButton>

        {isSubmitting && <p>Отправка...</p>}
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Create Account</Link>
      </p>
    </SignLayout>
  );
};

export default SignInPage;
