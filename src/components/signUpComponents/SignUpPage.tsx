import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import SignLayout from "../signLayout/SignLayout";
import SignButton from "./signButton/SignButton";

const SignUpPage: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be more then 6 symbols")
      .required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept terms"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false)
    console.log(values)
  };

  return (
    <SignLayout>
      <h1>Create an Account</h1>
      <p className={styles.subtitle}>Create a account to continue</p>
      <Formik
        initialValues={{ email: "", username: "", password: "", terms: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <label htmlFor="email">
              Email address:
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="esteban_schiller@gmail.com"
              />
              <ErrorMessage name="email" component="p" className={styles.error} />
            </label>

            <label htmlFor="username">
              Username:
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
              <ErrorMessage name="username" component="p" className={styles.error} />
            </label>

            <label htmlFor="password">
              <div className={styles.labelPassword}>
                <span>Password:</span>
                <span>Forget password?</span>
              </div>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="&#183;&#183;&#183;&#183;&#183;&#183;"
              />
              <ErrorMessage name="password" component="p" className={styles.error} />
            </label>

            <div className={styles.termsContainer}>
            <label htmlFor="terms" className={styles.termsLabel}>
              <Field type="checkbox" name="terms" id="terms" />
                I accept <a href="#">terms and conditions</a>
              </label>
              <ErrorMessage name="terms" component="p" className={styles.error} />
            </div>

            <SignButton disabled={isSubmitting}>
              Sign Up
            </SignButton>

            {isSubmitting && <p>Отправка...</p>}
          </Form>
        )}
      </Formik>
      <p>
        Already have an account? <Link to='/signin'>Login</Link>
      </p>
    </SignLayout>
  );
};

export default SignUpPage;
