import React from "react";
import logo from "../../assets/image/logo-nike.png";
import { Link } from "react-router-dom";
import UserComponent from "../HeaderComponent/UserComponent/UserComponent";
const HeaderAdmin = () => {
  return (
    <div
      style={{
        height: "40px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
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
      <div style={{ padding: "10px 10px", cursor: "pointer" }}>
        <UserComponent />
      </div>
    </div>
  );
};

export default HeaderAdmin;
