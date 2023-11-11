import React from "react";
import ProductdetailComponent from "../../components/ProductDetailComponent/ProductdetailComponent";
import "./style.scss";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const paramId = useParams();
  return <ProductdetailComponent idProduct={paramId} />;
};

export default ProductDetailPage;
