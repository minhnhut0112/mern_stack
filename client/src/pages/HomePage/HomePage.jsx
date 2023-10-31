import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/image/sl1.jpg";
import slider2 from "../../assets/image/sl2.jpg";
import slider3 from "../../assets/image/sl3.jpg";
import "./styles.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import Grid from "@mui/material/Grid";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "react-query";

const HomePage = () => {
  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    console.log(res);

    return res;
  };

  const { isLoading, data: products } = useQuery(
    ["products"],
    fetchAllProduct,
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  return (
    <div className="homepage">
      <SliderComponent arrImages={[slider1, slider2, slider3]} />
      <h1 className="homepage__title">New & Feature</h1>
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
        <button>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
