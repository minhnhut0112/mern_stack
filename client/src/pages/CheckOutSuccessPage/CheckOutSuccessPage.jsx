import { Grid } from "@mui/material";
import React from "react";
import imgsuccess from "../../assets/image/success.png";

const CheckOutSuccessPage = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Grid item xs={5}>
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <img src={imgsuccess} width={60} />
            </div>
            <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
              Order Success
            </h1>

            <div style={{ textAlign: "center", margin: "20px 10px" }}>
              <h4>Thank you for shopping at Space Sneaker</h4>
              <p>
                Your order will be shipped as soon as possible, please track
                your order status
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckOutSuccessPage;
