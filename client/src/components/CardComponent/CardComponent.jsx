import React from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const { countInStock, image, name, price, type, discount, id } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
  return (
    <div className="box" onClick={() => handleDetailsProduct(id)}>
      <div className="box__image">
        <img src={image} alt="product1" style={{ height: "450px" }} />
      </div>
      <p style={{ fontSize: 20, marginTop: 10 }}>{name}</p>
      <p style={{ fontSize: 17, margin: "5px 0px" }}>{type}</p>
      <p>
        <span style={{ color: "#929292", textDecoration: "line-through" }}>
          ${price}
        </span>{" "}
        <span style={{ color: "red" }}>${price - discount}</span>
      </p>
    </div>
  );
};

export default CardComponent;
