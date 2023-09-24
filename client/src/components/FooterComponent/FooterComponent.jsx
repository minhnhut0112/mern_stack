import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "./style.scss";

const FooterComponent = () => {
  return (
    <div>
      <h5 className="footer">
        <CopyrightIcon /> 2023 Nike, Inc. All Rights Reserved
      </h5>
    </div>
  );
};

export default FooterComponent;
