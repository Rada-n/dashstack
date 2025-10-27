import React, { useState } from "react";
import styles from "./ModalAddProduct.module.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Product } from "../../../fetch/productsApi";
import SuccessModal from "../../successModal/SuccessModal";
import { useActions } from "../../../hooks/useActions";
import Modal from "../../modal/Modal";

const validationShema = Yup.object().shape({
  name: Yup.string().required("Name field is required!"),
  price: Yup.number()
    .required("Price field is required!")
    .positive("Price must be positive!"),
  category: Yup.string().required("Category is required!"),
  rating: Yup.number().min(1).max(5).integer().required("Rating is required!"),
  reviews: Yup.number().min(0).integer().required("Reviews is required!"),
  image: Yup.mixed().nullable(),
});

const ModalAddProduct: React.FC<{ onClose: () => void, onProductAdded: () => void }> = ({ onClose, onProductAdded }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [productAdded, setProductAdded] = useState<any>(null);
  const { addProduct } = useActions();

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: FormikHelpers<any>
  ) => {
    setIsSubmit(true);
    setProductAdded(values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("rating", values.rating);
    formData.append("reviews", values.reviews);

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await addProduct(formData);
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isSubmit && (
        <SuccessModal
          text={`${productAdded?.name} was successfully added!`}
          onClose={() => {
            setIsSubmit(false);
            onProductAdded();
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
            category: "",
            rating: 1,
            reviews: 0,
            image: null,
          }}
          validationSchema={validationShema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className={styles.formInner}>
              <div>
                <label>Name</label>
                <Field type="text" name="name" className={styles.input} />
                <div className={styles.error}>
                  <ErrorMessage name="name" component="div" />
                </div>
              </div>

              <div>
                <label>Price</label>
                <Field type="number" name="price" className={styles.input} />
                <div className={styles.error}>
                  <ErrorMessage name="price" component="div"  />
                </div>
              </div>

              <div>
                <label>Category</label>
                <Field type="text" name="category" className={styles.input} />
                <div className={styles.error}>
                  <ErrorMessage name="category" component="div" />
                </div>
              </div>

              <div>
                <label>Rating</label>
                <Field type="number" name="rating" className={styles.input} />
                <div className={styles.error}>
                  <ErrorMessage name="rating" component="div" />
                </div>
              </div>

              <div>
                <label>Reviews</label>
                <Field type="number" name="reviews" className={styles.input} />
                <div className={styles.error}>
                  <ErrorMessage name="reviews" component="div" />
                </div>
              </div>

              <div className={styles.imageContainer}>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }
                  }}
                />
                <div className={styles.error}>
                  <ErrorMessage name="image" component="div" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.addProductButton}
              >
                {isSubmitting ? "Loading..." : "Add product!"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalAddProduct;

