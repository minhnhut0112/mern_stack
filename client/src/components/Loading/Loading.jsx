import React from "react";
import { Spin } from "antd";
const Loading = ({ children, isLoading, deday = 200 }) => {
  return (
    <div>
      <Spin spinning={isLoading} delay={deday}>
        {children}
      </Spin>
    </div>
  );
};

export default Loading;
