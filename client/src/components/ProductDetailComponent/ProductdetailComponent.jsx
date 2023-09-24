import React from "react";
import product1 from "../../assets/image/12.jpg";
import "./style.scss";
import Grid from "@mui/material/Grid";

const ProductdetailComponent = () => {
  return (
    <div>
      <Grid container className="row">
        <Grid item xs={6} spacing={2} container className="row__col">
          <Grid item xs={2} className="row__col__imgsmall">
            <img src={product1} alt="1" />
            <img src={product1} alt="1" />
            <img src={product1} alt="1" />
            <img src={product1} alt="1" />
          </Grid>
          <Grid item xs={10} className="row__col__imgbig">
            <img width={100} height={100} src={product1} alt="1" />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <h4>NUKE 26245</h4>
          <h5>jordAN</h5>
          <select name="" id="">
            <option value="">34</option>
            <option value="">25</option>
            <option value="">24</option>
            <option value="">34</option>
          </select>
          <p>45$</p>
          <button>add to card</button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductdetailComponent;
