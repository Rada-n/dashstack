import React, { useEffect } from "react";
import styles from "./ProductsCatalog.module.css";
import { useGetProductsQuery, fetchProducts } from "../../../fetch/productsApi";
import { Product } from "../../../fetch/productsApi";
import SortProducts from "../sortProducts/SortProducts";
import { useState } from "react";
import ProductCard from "../productCardComponent/ProductCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import ModalAddProduct from "../modalAddProduct/ModalAddProduct";
import AddButton from "../../addButton/AddButton";
import Loading from "../../loading/Loading";
import { useUser } from "../../../providers/UserProvider";
import ModalAuthUser from "../../modalAuthUser/ModalAuthUser";

interface UseGetProductsQuery {
  data: Product[];
  isLoading: boolean;
  error: any;
  isError: boolean;
}

export const ProductsCatalog: React.FC = () => {
    // const { data, isLoading, error, isError }: UseGetProductsQuery = useGetProductsQuery();
  const [filter, setFilter] = useState("All");
  const [sortCategory, setSortCategory] = useState("All");
  const [sortDirection, setSortDirection] = useState("All");
  const { inputSearchProduct } = useSelector((state: RootState) => state.navigate);
  const dispatch = useDispatch();
  const { data, status } = useSelector((state: RootState) => state.products);
  const [isModalButtonClicked, setIsModalButtonClicked] = useState(false);
  const { currentUser, setCurrentUser } = useUser();


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductAdded = () => {
    dispatch(fetchProducts());
  };

    if (status === 'loading') {
      return <Loading />
    }
  //   if (isError) {
  //     return <p>Error: {error.message}</p>;
  //   }

  const closeModal = () => {
    setIsModalButtonClicked(false);
};

  const filtredProducts: Product[] = data?.data?.filter((product: Product) => {
    if (filter === "All") return true;
    return product.category === filter;
  }) || [];


    const sortedProducts: Product[] = [...filtredProducts]?.sort(
      (a: Product, b: Product) => {
        if (sortCategory === "Price" && sortDirection !== "All") {
          return sortDirection === "Increase"
            ? a.price - b.price
            : b.price - a.price;
        }
        if (sortCategory === "Rating" && sortDirection !== "All") {
          return sortDirection === "Increase"
            ? a.rating - b.rating
            : b.rating - a.rating;
        }
        return 0;
      }
    ) || [];
  
    const searchFiltredAndSortedProducts = sortedProducts?.filter((product: Product) => {
      if (inputSearchProduct && inputSearchProduct.trim()) {
        return product.name.toLowerCase().includes(inputSearchProduct.toLowerCase());
      } else return true
    }) || [];


  return (
    <section className={styles.productsCatalogSection}>
      <div className={styles.sortFilterContainer}>
          <SortProducts
            filter={filter}
            setFilter={setFilter}
            sortCategory={sortCategory}
            setSortCategory={setSortCategory}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
         <AddButton add={setIsModalButtonClicked}>Add New Product</AddButton>
         {currentUser ?
         isModalButtonClicked && <ModalAddProduct onClose={closeModal} onProductAdded={handleProductAdded} />
         : isModalButtonClicked && <ModalAuthUser onClose={closeModal} />}
      </div>
      <div className={styles.productCardsContainer}>
        {searchFiltredAndSortedProducts?.map(
          (product: Product) => (
            <ProductCard key={product.id} product={product} onProductChanged={handleProductAdded}  />
          )
        )}
      </div>
    </section>
  );
};
