import React, { useEffect, useRef } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/image/sl1.jpg";
import slider2 from "../../assets/image/sl2.jpg";
import slider3 from "../../assets/image/sl3.jpg";
import "./styles.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import Grid from "@mui/material/Grid";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounceHook";
import { useState } from "react";

const HomePage = () => {
  const productSearch = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(productSearch, 500);
  const [limit, setLimit] = useState(3);
  const [searchTitle, setSearchTitle] = useState(false);

  const fetchAllProduct = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    if (search) {
      setSearchTitle(true);
    } else {
      setSearchTitle(false);
    }
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };

  // useEffect(() => {
  //   if (reSearch.current) {
  //     fetchAllProduct(searchDebounce);
  //   }
  //   reSearch.current = true;
  // }, [searchDebounce]);

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchAllProduct, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  // const { isLoading, data: products } = useQuery(
  //   ["products", searchDebounce],
  //   fetchAllProduct,
  //   {
  //     retry: 3,
  //     retryDelay: 1000,
  //   }
  // );

  return (
    <div className="homepage">
      {/* <SliderComponent arrImages={[slider1, slider2, slider3]} /> */}
      <h1 className="homepage__title">
        {!searchTitle ? <>New & Feature</> : <>Search Result</>}
      </h1>
      <Grid container spacing={3}>
        {products?.data?.map((product) => {
          return (
            <Grid item xs={12} md={4} sm={6}>
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                image={product.image}
                name={product.name}
                price={product.price}
                type={product.type}
                discount={product.discount}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className="homepage__button">
        <button onClick={() => setLimit((prev) => prev + 3)}>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
