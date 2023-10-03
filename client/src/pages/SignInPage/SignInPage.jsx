import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import InputComponent from "../../components/InputComponent/InputComponent";
import Grid from "@mui/material/Grid";
import login from "../../assets/image/login-logo.jpg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    console.log("signIn", email, password);
  };

  return (
    <div style={{ height: "1000px", backgroundColor: "#f5f5f5" }}>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "40px 20px",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={login} alt="ss" style={{ width: "90%", height: "90%" }} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: "60px" }}>Sign In</h2>
          <InputComponent
            value={email}
            handleOnChange={handleOnChangeEmail}
            type="email"
            label="Email"
          />
          <InputComponent
            value={password}
            handleOnChange={handleOnChangePassword}
            type="password"
            label="PassWord"
          />
          <Button
            sx={{
              width: { xs: "90%", md: "80%" },
              height: "40px",
              marginBottom: "20px",
            }}
            disabled={!email.length || !password.length}
            onClick={handleSignIn}
            variant="outlined"
          >
            Sign In
          </Button>

          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                textAlign: "start",
                marginLeft: { xs: "30px", md: "40px" },
                marginBottom: { xs: "20px" },
              }}
            >
              <Link>Forgot password?</Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                textAlign: "start",
                marginLeft: { xs: "30px", md: "90px" },
                marginBottom: { xs: "20px" },
              }}
            >
              <Link to="/sign-up"> Create new account</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
