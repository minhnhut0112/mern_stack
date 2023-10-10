import { Alert } from "@mui/material";

const success = (mes = "Success") => {
  return <Alert severity="success">{mes}</Alert>;
};

const error = (mes = "Error") => {
  return <Alert severity="error">{mes}</Alert>;
};

const warning = (mes = "Warning") => {
  return <Alert severity="warning">{mes}</Alert>;
};

export { success, error, warning };
