import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "./style.scss";

const FooterComponent = () => {
  return (
    <div>
      <h5
        style={{ backgroundColor: "#f5f5f5", marginTop: 20, height: 50 }}
        className="footer"
      >
        <CopyrightIcon /> 2023 Space Sneakers, Inc. All Rights Reserved
      </h5>
    </div>
  );
};

export default FooterComponent;
