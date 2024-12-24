import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductsComponents/productCardComponent/ProductCard";
import styles from "./FavoritesPage.module.css";
import { fetchProducts, Product } from "../../../fetch/productsApi";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../layout/Layout";

const FavoritesPage: React.FC = () => {
  const { likedProducts } = useSelector(
    (state: RootState) => state.favoriteProduct
  );
  const { data } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const favoriteProducts = data.filter(
    (product: Product) => likedProducts[product.id]
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  return (
      <Layout>
        <h1 className={styles.title}>Favorites</h1>
        {!favoriteProducts.length && (
          <p className={styles.emptyFavorites}>There's no favorites!</p>
        )}
        <div className={styles.productsCardContainer}>
          {favoriteProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Layout>
  );
};

export default FavoritesPage;
