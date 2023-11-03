import React from "react";
import Grid from "@mui/material/Grid";
import product1 from "../../assets/image/nike1.1.jpg";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./style.scss";
const CartComponent = () => {
  return (
    <div>
      <Grid sx={{ padding: "0 5%", marginTop: 2 }} container spacing={3}>
        <Grid item xs md={7}>
          <h2 style={{ marginBottom: 10 }}>Bag</h2>
          <Grid container spacing={3}>
            <Grid item md={3} xs={3}>
              <img
                src={product1}
                alt="pd1"
                style={{ width: "85%", height: "85%" }}
              />
            </Grid>
            <Grid item md={8} xs={9}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Nike Air Dunk 345</h3>
                <h3>$ 250</h3>
              </div>
              <h5 style={{ margin: "10px 0px" }}>Jordan </h5>
              <div>
                <label htmlFor="size">Size</label>
                <select
                  name="size"
                  id="size"
                  style={{ width: 50, border: "none ", marginRight: 10 }}
                >
                  <option value="34">34</option>
                  <option value="34">34</option>
                  <option value="34">34</option>
                  <option value="34">34</option>
                </select>
                <label htmlFor="quantity">Quantity</label>
                <select
                  name="quantity"
                  id="quantity"
                  style={{ width: 50, border: "none " }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div style={{ marginTop: 10 }}>
                <DeleteOutlineOutlinedIcon />
              </div>
            </Grid>
          </Grid>
          <hr />
        </Grid>
        <Grid item xs md={4} className="order__total">
          <h2 style={{ marginBottom: 10 }}>Summary</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <h3>Subtotal:</h3>
            <h3>250 $</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <h3>Estimated Delivery: </h3>
            <h3>5 $</h3>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <h3>Total:</h3>
            <h3>253 $</h3>
          </div>
          <hr />
          <button className="addcart">add to card</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartComponent;
