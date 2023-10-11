import * as React from "react";
import * as UserService from "../../service/UserService";
import InputComponent from "../../components/InputComponent/InputComponent";
import Grid from "@mui/material/Grid";
import login from "../../assets/image/login-logo.jpg";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { Button, CircularProgress } from "@mui/material";

export default function SignInPage() {
  const disPatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, isLoading } = mutation;

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === "OK") {
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [data]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    disPatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
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
          <h2 style={{ marginTop: "60px" }}>Sign In</h2>
          <div style={{ color: "red", marginBottom: "10px" }}>
            {data?.status === "Err" && <span>{data?.message}</span>}
          </div>
          <InputComponent
            style={{ width: "50%" }}
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
            variant="outlined"
            sx={{
              width: { xs: "90%", md: "80%" },
              height: "40px",
              marginBottom: "20px",
            }}
            disabled={!email.length || !password.length || isLoading === true}
            onClick={handleSignIn}
          >
            {isLoading ? (
              <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
            ) : (
              <div>Sign In</div>
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
