import React from "react";
import product1 from "../../assets/image/nike1.1.jpg";
import product2 from "../../assets/image/nike1.2.jpg";
import product3 from "../../assets/image/nike1.3.jpg";
import product4 from "../../assets/image/nike1.4.jpg";
import "./style.scss";
import Grid from "@mui/material/Grid";
import SizeGuideComponent from "../SizeGuideComponent/SizeGuideComponent";

const ProductdetailComponent = () => {
  const hd = () => {
    document.querySelectorAll("#imgsmall").forEach((img_small) => {
      img_small.addEventListener("click", () => {
        var src = img_small.getAttribute("src");
        document.querySelector("#imgbig").src = src;
      });
    });
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          padding: {
            xs: "0 20px",
            md: "20px 50px",
            display: "flex",
            justifyContent: "center",
          },
        }}
        className="row"
      >
        <Grid item xs={12} md={7} spacing={2} container className="row__col">
          <Grid item xs={3} md={2} className="row__col__imgsmall">
            <img onClick={hd} src={product1} alt="1" id="imgsmall" />
            <img onClick={hd} src={product2} alt="1" id="imgsmall" />
            <img onClick={hd} src={product3} alt="1" id="imgsmall" />
            <img onClick={hd} src={product4} alt="1" id="imgsmall" />
          </Grid>
          <Grid item xs={9} md={10} className="row__col__imgbig">
            <img src={product1} alt="1" id="imgbig" />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} className="row__content">
          <p className="row__content__title">
            NUKE 26245 <br />
            <span className="row__content__category">Jordan</span>
          </p>
          <p className="row__content__price">$ 45</p>
          <div className="row__content__selectsize">
            <p>Select Size</p>
            <div>
              <SizeGuideComponent />
            </div>
          </div>

          <div className="row__content__size">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <input type="radio" id="40" name="size" value="40" />
                <label htmlFor="40">40</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="41" name="size" value="41" />
                <label htmlFor="41">41</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="42" name="size" value="42" />
                <label htmlFor="42">42</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="43" name="size" value="43" />
                <label htmlFor="43">43</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="44" name="size" value="44" />
                <label htmlFor="44">44</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="45" name="size" value="45" />
                <label htmlFor="45">45</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="46" name="size" value="46" />
                <label htmlFor="46">46</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="47" name="size" value="47" />
                <label htmlFor="47">47</label>
              </Grid>
              <Grid item xs={3}>
                <input type="radio" id="48" name="size" value="48" />
                <label htmlFor="48">48</label>
              </Grid>
            </Grid>
          </div>
          <button className="row__content__addcart">add to card</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductdetailComponent;
