import React from "react";
import ProductdetailComponent from "../../components/ProductDetailComponent/ProductdetailComponent";
import "./style.scss";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const paramId = useParams();
  console.log(paramId);
  return <ProductdetailComponent idProduct={paramId} />;
};

export default ProductDetailPage;
