import React from "react";
import "./styles.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import Grid from "@mui/material/Grid";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "react-query";
import { useState } from "react";
import { Button, CircularProgress, LinearProgress } from "@mui/material";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/image/sl1.jpg";
import slider2 from "../../assets/image/sl2.jpg";
import slider3 from "../../assets/image/sl3.jpg";

const HomePage = () => {
  const [limit, setLimit] = useState(6);

  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct("", limit);
    return res;
  };

  const { isLoading, data: products } = useQuery(
    ["products", limit],
    fetchAllProduct,
    {
      retry: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <SliderComponent arrImages={[slider1, slider2, slider3]} />
      {isLoading ? (
        <>
          <LinearProgress />
        </>
      ) : (
        <>
          <div className="homepage">
            <h1 className="homepage__title">New & Feature</h1>
            <Grid container spacing={3}>
              {products?.data?.map((product) => {
                return (
                  <Grid item xs={12} md={4} sm={6} key={product?._id}>
                    <CardComponent
                      countInStock={product.countInStock}
                      image={product.image.img1}
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
              <span style={{ cursor: "not-allowed" }}>
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
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
