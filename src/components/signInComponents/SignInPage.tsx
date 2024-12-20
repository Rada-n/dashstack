import React from 'react'
import SignLayout from '../signLayout/SignLayout'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from './SignInPage.module.css'
import SignButton from '../signUpComponents/signButton/SignButton';

const SignInPage:React.FC = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Incorrect email").required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be more then 6 symbols")
          .required("Password is required"),
      });
    
      const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        console.log(values)
      };
    
      return (
        <SignLayout>
          <h1>Login to Account</h1>
          <p className={styles.subtitle}>Please enter your email and password to continue</p>
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

                <div className={styles.rememberPassContainer}>
                    <input type="checkbox" /> 
                    Remember Password
                </div>
    
                <SignButton disabled={isSubmitting}>
                  Sign In
                </SignButton>
    
                {isSubmitting && <p>Отправка...</p>}
              </Form>
            )}
          </Formik>
          <p>
          Don’t have an account? <Link to='/signup'>Create Account</Link>
          </p>
          <b>AAAAAA</b>
        </SignLayout>
      )
}

export default SignInPage
