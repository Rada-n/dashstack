import React, { useState } from "react";
import styles from "./ModalEditProduct.module.css";
import { Product } from "../../../fetch/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useActions } from "../../../hooks/useActions";
import Modal from "../../modal/Modal";


const ModalEditProduct: React.FC<{
  product: Product;
  onClose: () => void;
  onProductChanged: () => void;
}> = ({ product, onClose, onProductChanged }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });
  const { editProduct, deleteProduct } = useActions();
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validateFields = (): boolean => {
    const newErrors: Partial<Record<keyof Product, string>> = {};

    if (!editedProduct.name?.trim()) newErrors.name = "Name field is required!";
    if (!editedProduct.price) newErrors.price = "Price field is required!";
    if (!editedProduct.category?.trim())
      newErrors.category = "Category field is required!";
    if (!editedProduct.rating)
      newErrors.rating = "Rating field is required!";
    if (editedProduct.rating && (editedProduct.rating < 1 || editedProduct.rating > 5))
      newErrors.rating = "Rating must be between 1 and 5!";
    if (editedProduct.reviews == null)
      newErrors.reviews = "Reviews field is required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) return;

    setIsSaving(true);

    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("price", String(editedProduct.price));
    formData.append("category", editedProduct.category);
    formData.append("rating", String(editedProduct.rating));
    formData.append("reviews", String(editedProduct.reviews));
    if (file) {
      formData.append("image", file);
    }

    try {
      await editProduct({ id: editedProduct.id, formData });
      onProductChanged();
      onClose();
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(editedProduct.id);
      onProductChanged();
      onClose();
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Edit product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {(["name", "price", "category", "rating", "reviews"] as (keyof Product)[]).map(
          (fieldName) => (
            <label key={fieldName} className={styles.label}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              <input
                type={["price", "rating", "reviews"].includes(fieldName)
                  ? "number"
                  : "text"}
                name={fieldName}
                value={editedProduct[fieldName] ?? ""}
                onChange={handleInputChange}
                className={errors[fieldName] ? styles.inputError : ""}
                disabled={isSaving || isDeleting}
              />
              {errors[fieldName] && (
                <span className={styles.errorText}>{errors[fieldName]}</span>
              )}
            </label>
          )
        )}

        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSaving || isDeleting}
          />
        </label>

        <div className={styles.buttonsContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSaving || isDeleting}
          >
            {isSaving ? "Loading..." : "Save all changes"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className={styles.deleteButton}
            disabled={isSaving || isDeleting}
          >
            {isDeleting ? "Loading..." : "Delete"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditProduct;

