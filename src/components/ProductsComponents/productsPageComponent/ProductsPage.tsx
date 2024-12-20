import React from "react";
import { CarouselAds } from "../carouselAds/CarouselAds";
import { ProductsCatalog } from "../productsCatalog/ProductsCatalog";
import Layout from "../../layout/Layout";

export const ProductsPage: React.FC = () => {
  return (
    <Layout>
      <h1>Products</h1>
      {/* <CarouselAds /> */}
      <ProductsCatalog />
    </Layout>
  );
};
