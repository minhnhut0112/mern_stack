import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/image/slider1.jpg";
import slider2 from "../../assets/image/slider2.jpg";
import slider3 from "../../assets/image/slider3.jpg";
import "./styles.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  return (
    <div className="homepage">
      <SliderComponent arrImages={[slider1, slider2, slider3]} />
      <h1 className="homepage__title">New & Feature</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <CardComponent />
        </Grid>
      </Grid>
      <div className="homepage__button">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
