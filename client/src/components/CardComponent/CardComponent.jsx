import React from "react";
import product1 from "../../assets/image/nike1.1.jpg";
import "./style.scss";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
  const { countInStock, image, name, price, type, discount } = props;
  return (
    <Link to="/product-detail">
      <div className="box">
        <div className="box__image">
          <img src={image} alt="product1" />
        </div>
        <h4>{name}</h4>
        <h5>{type}</h5>
        <p>
          $ {price} <span style={{ color: "red" }}>{discount || 5}%</span>
        </p>
      </div>
    </Link>
  );
};

export default CardComponent;
