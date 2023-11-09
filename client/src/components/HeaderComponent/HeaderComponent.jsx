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
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/jordan-logo.png";
import logomini2 from "../../assets/image/conver-logo.png";
import logobig from "../../assets/image/logo-nike.png";
import { useState } from "react";
import * as ProductService from "../../service/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/slices/productSlice";
import { useEffect } from "react";

const HeaderComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [typeProducts, setTypeProducts] = useState([]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();

  const handleOnChangeSearch = (e) => {
    dispatch(searchProduct(e.target.value));
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const navigate = useNavigate();

  const navigateType = (type) => {
    navigate(`/product/${type}`);
  };

  const order = useSelector((state) => state.order);

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
              <MenuItem>
                <Link to="/" style={{ color: "black" }}>
                  <Typography textAlign="center">New & Feature</Typography>
                </Link>
              </MenuItem>
              {typeProducts.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigateType(page)}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
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
            <Link to="/">
              <img width={80} src={logobig} alt="logo" />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "black", display: "block" }}>
              <Link to="/" style={{ color: "black" }}>
                <h3 textAlign="center">New & Feature</h3>
              </Link>
            </Button>
            {typeProducts.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                <h3 textAlign="center" onClick={() => navigateType(page)}>
                  {page}
                </h3>
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
            <div style={{ cursor: "pointer" }}>
              <SearchComponent onChange={handleOnChangeSearch} />
            </div>
            <Link to="/cart" style={{ color: "black" }}>
              {user?.id ? (
                <>
                  <Badge badgeContent={order?.orderItems?.length} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </>
              ) : (
                <>
                  <ShoppingCartOutlinedIcon />
                </>
              )}
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderComponent;
