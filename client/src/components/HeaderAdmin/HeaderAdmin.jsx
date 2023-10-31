import React from "react";
import logo from "../../assets/image/logo-nike.png";
import { Link } from "react-router-dom";
const HeaderAdmin = () => {
  return (
    <div style={{ height: "40px", backgroundColor: "#f5f5f5" }}>
      <Link to="/">
        <div
          style={{
            color: "black",
            padding: 10,
            fontSize: 20,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          SPACE SNEAKER
        </div>
      </Link>
    </div>
  );
};

export default HeaderAdmin;
