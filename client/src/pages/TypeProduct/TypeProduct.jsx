import React from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import "./style.scss";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

const TypeProduct = () => {
  return (
    <div className="category">
      <h1 className="category__title">Jordan</h1>
      <div className="category__filters">
        <select defaultValue={0}>
          <option style={{ display: "none" }}>Filter</option>
          <option>Volvo</option>
          <option>Saab</option>
          <option>Mercedes</option>
          <option>Audi</option>
        </select>
      </div>
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
      </Grid>
      <div className="category__pagination">
        <Pagination count={5} variant="outlined" color="primary" />
      </div>
    </div>
  );
};

export default TypeProduct;
