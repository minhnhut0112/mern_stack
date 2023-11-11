import React from "react";
import "./styles.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import Grid from "@mui/material/Grid";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounceHook";
import { useState } from "react";
import { Button, CircularProgress, LinearProgress } from "@mui/material";

const HomePage = () => {
  const productSearch = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(productSearch, 500);
  const [limit, setLimit] = useState(6);
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

  const { isLoading, data: products } = useQuery(
    ["products", limit, searchDebounce],
    fetchAllProduct,
    {
      retry: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      {/* <SliderComponent arrImages={[slider1, slider2, slider3]} /> */}
      {isLoading ? (
        <>
          <LinearProgress />
        </>
      ) : (
        <>
          <div className="homepage">
            <h1 className="homepage__title">
              {!searchTitle ? <>New & Feature</> : <>Search Result</>}
            </h1>
            <Grid container spacing={3}>
              {products?.data?.map((product) => {
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
            <div className="homepage__button">
              <Button
                sx={{ color: "black", borderColor: "black" }}
                variant="outlined"
                disabled={
                  products?.total === products?.data?.length ||
                  products?.totalPage === 1
                }
                onClick={() => setLimit((prev) => prev + 3)}
              >
                {isLoading ? <CircularProgress /> : <>Load More</>}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
