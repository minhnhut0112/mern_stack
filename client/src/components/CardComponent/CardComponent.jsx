import React from "react";
import product1 from "../../assets/image/nike1.1.jpg";
import "./style.scss";
import { Link } from "react-router-dom";

const CardComponent = () => {
  return (
    <Link to="/product-detail">
      <div className="box">
        <div className="box__image">
          <img src={product1} alt="product1" />
        </div>
        <h4>NIKE 234</h4>
        <h5>Jordan</h5>
        <p>234$</p>
      </div>
    </Link>
  );
};

export default CardComponent;
