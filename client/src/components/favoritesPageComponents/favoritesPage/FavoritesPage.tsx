import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductsComponents/productCardComponent/ProductCard";
import styles from "./FavoritesPage.module.css";
import { fetchFavourites, fetchProducts, Product } from "../../../fetch/productsApi";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../layout/Layout";

const FavoritesPage: React.FC = () => {
  const { likedProducts } = useSelector(
    (state: RootState) => state.products
  ) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  return (
      <Layout>
        <h1 className={styles.title}>Favorites</h1>
        
        {likedProducts.length === 0 ? (
        <p className={styles.emptyFavorites}>There are no favorites!</p>
      ) : (
        <div className={styles.productsCardContainer}>
          {likedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      </Layout>
  );
};

export default FavoritesPage;
