import React, { useState } from "react";
import styles from "./ModalEditProduct.module.css";
import { Product } from "../../../fetch/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useActions } from "../../../hooks/useActions";
import Modal from "../../modal/Modal";

const ModalEditProduct: React.FC<{ product: Product; onClose: () => void }> = ({
  product,
  onClose,
}) => {
  const [editedProduct, setEditedProducts] = useState({ ...product });
  const { isLoading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { editProduct, deleteProduct } = useActions();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEditedProducts({ ...editedProduct, [name]: value });
  };

  const handleClose = (): void => {
    setIsVisible(true);
    setTimeout(() => onClose(), 500);
  };

  return (
    <Modal onClose={handleClose}>
      <h2>Edit product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          editProduct(editedProduct);
          handleClose();
        }}
        className={styles.form}
      >
        {["name", "price", "image", "category", "rating", "reviews"].map(
          (fieldName: string) => (
            <label key={fieldName}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              <input
                type={
                  ["price", "rating", "reviews"].includes(fieldName)
                    ? "number"
                    : "text"
                }
                name={fieldName}
                value={editedProduct[fieldName]}
                onChange={handleInputChange}
              />
            </label>
          )
        )}
        <div className={styles.buttonsContainer}>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? "Loading..." : "Save all changes"}
          </button>
          <button
            onClick={() => deleteProduct(editedProduct.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditProduct;
