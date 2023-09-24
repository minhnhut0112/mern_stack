import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const CategoryComponent = (name) => {
  return (
    <div>
      <Link className="link" to="/category">
        {name.name}
      </Link>
    </div>
  );
};

export default CategoryComponent;
