import React, { useState } from "react";
import { Product } from "../../../fetch/productsApi";
import styles from "./ProductCard.module.css";
import ProductRating from "../productRating/ProductRating";
import ImageProduct from "./imageProduct/ImageProduct";
import Like from "../../likeComponent/Like";
import ModalEditProduct from "../modalEditProduct/ModalEditProduct";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)

  return (
    <>
     {isEditButtonClicked && <ModalEditProduct product={product} onClose={setIsEditButtonClicked} />}
      <article className={styles.productCard}>
        <ImageProduct image={product.image} />
        <div className={styles.profuctInfoContainer}>
            <div className={styles.productInfo}>
              <h4 className={styles.productTitle}>{product.name}</h4>
              <span className={styles.productPrice}>{product.price}$</span>
              <div className={styles.ratingContainer}>
                <ProductRating rating={product.rating} />
                <span className={styles.productReviews}>({product.reviews})</span>
              </div>
              <button className={styles.editButton} onClick={() => setIsEditButtonClicked(true)}>Edit Product</button>
            </div>
           <Like productId={product.id}/>
        </div>
      </article>
    </>
  );
};

export default ProductCard;
