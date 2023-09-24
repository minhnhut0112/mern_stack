import React from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import "./style.scss";
import Pagination from "@mui/material/Pagination";

const TypeProduct = () => {
  return (
    <div className="category">
      <h1 className="category__title">Jordan</h1>
      <div className="category__filters">
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          <option selected style={{ display: "none" }}>
            Filter
          </option>
        </select>
      </div>
      <div className="category__listcard">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
      <div className="category__pagination">
        <Pagination count={5} variant="outlined" color="primary" />
      </div>
    </div>
  );
};

export default TypeProduct;
