import React, { useEffect } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import "./style.scss";
import Grid from "@mui/material/Grid";
import * as ProductService from "../../service/ProductService";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounceHook";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TypeProduct = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const productCategory = parts[parts.length - 1];

  const [products, setProducts] = useState([]);

  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setProducts(res?.data);
    }
  };

  useEffect(() => {
    if (productCategory) {
      fetchProductType(productCategory);
    }
  }, [productCategory]);

  const typeTitle = decodeURIComponent(productCategory);
  const capitalizedCategory =
    typeTitle.charAt(0).toUpperCase() + typeTitle.slice(1);

  return (
    <div className="category">
      <h1 className="category__title">{capitalizedCategory}</h1>
      <Grid container spacing={3}>
        {products
          ?.filter((pro) => {
            if (searchDebounce === "") {
              return pro;
            } else if (
              pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())
            ) {
              return pro;
            }
          })
          ?.map((product) => {
            return (
              <Grid item xs={12} md={4} sm={6} key={product?._id}>
                <CardComponent
                  countInStock={product.countInStock}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  type={product.type}
                  discount={product.discount}
                  id={product._id}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default TypeProduct;
