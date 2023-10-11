import React from "react";
import TextField from "@mui/material/TextField";

const InputComponent = (props) => {
  const onChangeInput = (e) => {
    props.handleOnChange(e.target.value);
  };
  return (
    <div>
      <TextField
        sx={{
          width: { xs: "90%", md: "80%", marginBottom: "20px" },
        }}
        color="grey"
        value={props.value}
        onChange={onChangeInput}
        type={props.type}
        label={props.label}
      />
    </div>
  );
};

export default InputComponent;
