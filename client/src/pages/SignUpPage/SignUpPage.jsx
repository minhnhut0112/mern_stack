import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import sigin from "../../assets/image/sign_in.jpg";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUpPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src={sigin}
              alt=""
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </Box>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="fullname"
              label="Full name"
              type="text"
              id="fullname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phonenumber"
              label="Phone Number"
              type="text"
              id="phonenumber"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "white",
                  width: "180px",
                  color: "black",
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Link to="/" style={{ color: "black" }}>
                  Sign Up
                </Link>
              </Button>
            </div>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpass" style={{ color: "black" }}></Link>
              </Grid>
              <Grid item>
                <Link to="/sign-in" style={{ color: "black" }}>
                  Do have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
