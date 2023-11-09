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
        <img src={image} alt="product1" />
      </div>
      <h4>{name}</h4>
      <h5>{type}</h5>
      <p>
        $ {price} <span style={{ color: "red" }}>{discount || 15}</span>
      </p>
    </div>
  );
};

export default CardComponent;
