import React, { useState } from "react";
import { Product } from "../../../fetch/productsApi";
import styles from "./ProductCard.module.css";
import ProductRating from "../productRating/ProductRating";
import ImageProduct from "./imageProduct/ImageProduct";
import Like from "../../likeComponent/Like";
import ModalEditProduct from "../modalEditProduct/ModalEditProduct";
import { useUser } from "../../../providers/UserProvider";
import ModalAuthUser from "../../modalAuthUser/ModalAuthUser";
import { useMediaQuery } from "react-responsive";

const ProductCard: React.FC<{ product: Product; onProductChanged: () => void }> = ({ product, onProductChanged }) => {
  const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false);
  const { currentUser } = useUser();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 350px)" });

   const truncateName = (name: string, maxLength = 20) => {
    maxLength = isSmallScreen ? 10 : maxLength;
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  return (
    <>
     {currentUser ? 
     isEditButtonClicked && <ModalEditProduct product={product} onClose={setIsEditButtonClicked} onProductChanged={onProductChanged} />
     : isEditButtonClicked && <ModalAuthUser onClose={setIsEditButtonClicked}/>}
      <article className={styles.productCard}>
      <div className={styles.imageContainer}>
            <img src={`http://127.0.0.1:8000/storage/${product.image}`} />
          </div>
        <div className={styles.profuctInfoContainer}>
            <div className={styles.productInfo}>
              <h4 className={styles.productTitle}>{truncateName(product.name)}</h4>
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
