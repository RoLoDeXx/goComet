import React, { useContext } from "react";
import Styles from "./style.module.css";
import Card from "./Card";
import { ProductsContext } from "../../contexts/ProductContext";

const Gallery = () => {
  const { items } = useContext(ProductsContext);

  const renderItems = items.map((product) => {
    return <Card product={product} key={product.name} />;
  });

  return (
    <div className={Styles.galleryGrid}>
      <p className={Styles.productHeader}>
        <b>PRODUCTS</b>
      </p>
      {renderItems}
    </div>
  );
};

export default Gallery;
