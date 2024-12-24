import React, { useState } from "react";
import styles from "./ModalAddProduct.module.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Product } from "../../../fetch/productsApi";
import SuccessModal from "../../successModal/SuccessModal";
import { useActions } from "../../../hooks/useActions";
import Modal from "../../modal/Modal";

const validationShema = Yup.object<Product>().shape({
  name: Yup.string().required("Name field is required!"),
  price: Yup.number()
    .required("Price field is required!")
    .positive("Price must be positive!"),
  image: Yup.string().url("URL is incorrect!"),
  category: Yup.string().nullable(),
  rating: Yup.number().min(1).max(5).integer().nullable(),
  reviews: Yup.number().min(0).integer().nullable(),
});

const ModalAddProduct: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [productAdded, setProductAdded] = useState<Product | null>(null);
  const { addProduct } = useActions();

  const handleSubmit = (
    values: Product,
    { setSubmitting, setErrors }: FormikHelpers<Product>
  ) => {
    setIsSubmit(true);
    setProductAdded(values);
    setSubmitting(true);
    addProduct(values)
      .then(() => {})
      .catch((error: any) => {
        setErrors({ general: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      {isSubmit && (
        <SuccessModal
          text={`${productAdded?.name} was successfully add!`}
          onClose={(): void => {
            setIsSubmit(false);
            onClose();
            setProductAdded(null);
          }}
        />
      )}
      <Modal onClose={onClose}>
        <h2>Add new product</h2>
        <Formik
          initialValues={{
            name: "",
            price: 0,
            image: "",
            category: "",
            rating: 0,
            reviews: 0,
          }}
          validationSchema={validationShema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.formInner}>
              {["name", "price", "image", "category", "rating", "reviews"].map(
                (fieldName) => (
                  <div key={fieldName}>
                    <label htmlFor={fieldName}>
                      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                    </label>
                    <Field
                      type={
                        ["price", "rating", "reviews"].includes(fieldName)
                          ? "number"
                          : "text"
                      }
                      id={fieldName}
                      name={fieldName}
                      className={styles.input}
                    />
                    <ErrorMessage name={fieldName} component="div" />
                  </div>
                )
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.addProductButton}
              >
                Add product!
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
