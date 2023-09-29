import React from "react";
import Grid from "@mui/material/Grid";
import product1 from "../../assets/image/nike1.1.jpg";
import "./style.scss";

const OrderComponent = () => {
  return (
    <div>
      <Grid container spacing={3} className="order">
        <Grid item xs md={7} className="order__detail">
          <h3 className="order__detail__title">Bag</h3>
          <Grid container className="order__detail__item">
            <Grid item md={4} xs={3} className="order__detail__item__image">
              <img src={product1} alt="pd1" />
            </Grid>
            <Grid item md={8} xs={9} className="order__detail__item__content">
              <p>
                Nike 345 <br /> <span>jordan</span>
              </p>
              <label htmlFor="size">SIZE</label>
              <select name="size" id="size">
                <option value="34">34</option>
                <option value="34">34</option>
                <option value="34">34</option>
                <option value="34">34</option>
              </select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs md={5} className="order__total">
          total
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderComponent;
