import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import InputComponent from "../../components/InputComponent/InputComponent";
import Grid from "@mui/material/Grid";
import login from "../../assets/image/login-logo.jpg";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeFullname = (value) => {
    setFullname(value);
  };

  const mutation = useMutationHook((data) => UserService.signUpUser(data));
  const { data, isLoading } = mutation;

  useEffect(() => {
    if (data?.status === "True") {
      navigate("/sign-in");
    }
  }, [data]);

  console.log(mutation);

  const handleSignUp = () => {
    mutation.mutate({
      email,
      name,
      phone,
      password,
      confirmPassword,
    });
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
          <div>
            <h2 style={{ marginTop: "60px" }}>Sign Up</h2>
          </div>
          {data?.status === "Err" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <InputComponent
            value={email}
            handleOnChange={handleOnChangeEmail}
            type="email"
            label="Email"
          />

          <InputComponent
            value={name.trim()}
            handleOnChange={handleOnChangeFullname}
            type="text"
            label="Full Name"
          />
          <InputComponent
            value={phone.trim()}
            handleOnChange={handleOnChangePhone}
            type="text"
            label="Phone"
          />
          <InputComponent
            value={password.trim()}
            handleOnChange={handleOnChangePassword}
            type="password"
            label="PassWord"
          />
          <InputComponent
            value={confirmPassword.trim()}
            handleOnChange={handleOnChangeConfirmPassword}
            type="password"
            label="Confirm PassWord"
          />
          <Button
            variant="outlined"
            sx={{
              width: { xs: "90%", md: "80%" },
              height: "40px",
              marginBottom: "20px",
            }}
            disabled={
              !email.length ||
              !password.length ||
              !name ||
              !confirmPassword ||
              !phone ||
              isLoading === true
            }
            onClick={handleSignUp}
          >
            {isLoading ? (
              <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
            ) : (
              <div>Sign Up</div>
            )}
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
              {/* <Link>Forgot password?</Link> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                textAlign: "end",
                marginRight: { xs: "30px", md: "50px" },
                marginBottom: { xs: "20px" },
              }}
            >
              <Link to="/sign-in">Have a account? Sign In</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUpPage;
