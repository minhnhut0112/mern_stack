import React from "react";

const NavbarComponent = () => {
  const contenRender = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          <div>{option}</div>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <h3>Jordan</h3>
      <div>{contenRender("text", "Jor")}</div>
    </div>
  );
};

export default NavbarComponent;
