import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import SearchComponent from "./SearchComponent/SearchComponent";
import UserComponent from "./UserComponent/UserComponent";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/jordan-logo.png";
import logomini2 from "../../assets/image/conver-logo.png";
import logobig from "../../assets/image/logo-nike.png";

const pages = ["New & Feature", "Jordan", "Runing", "Football"];

function HeaderComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
      }}
      position="static"
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          height: "30px",
          padding: "0px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img width={40} src={logo} alt="logo" />
          <img width={40} src={logomini2} alt="logo" />
        </div>
        <div style={{ cursor: "pointer" }}>
          <UserComponent />
        </div>
      </div>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">
              <img width={80} src={logobig} alt="logo" />
            </Link>
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            style={{ alignItems: "center", display: "flex" }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link style={{ color: "black" }} to="/category">
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <img width={80} src={logobig} alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                <Link style={{ color: "black" }} to="/category">
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <div
            style={{
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchComponent />
            <Link to="cart" style={{ color: "black" }}>
              <Badge badgeContent={4} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderComponent;
