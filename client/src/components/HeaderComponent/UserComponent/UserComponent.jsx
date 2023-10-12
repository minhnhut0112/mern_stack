import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../../service/UserService";
import { resetUser } from "../../../redux/slices/userSlice";
import { useState } from "react";
import { useEffect } from "react";

const UserComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userName, setUserName] = useState("");

  const user = useSelector((state) => state.user);

  const disPatch = useDispatch();

  const handleLogout = async () => {
    await UserService.logoutUser();
    disPatch(resetUser());
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    setUserName(user?.name);
  }, [user?.name]);

  return (
    <div>
      {user?.access_token ? (
        <div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {userName.split("", 1)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link style={{ color: "black" }} to="/myprofile">
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
            </Link>

            <Link style={{ color: "black" }} to="/myorder">
              <MenuItem onClick={handleClose}>My Order</MenuItem>
            </Link>

            <Divider />
            <Link style={{ color: "black" }} to="/sign-in">
              <MenuItem onClick={handleClose}>
                <div onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Log out
                </div>
              </MenuItem>
            </Link>
          </Menu>
        </div>
      ) : (
        <div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link style={{ color: "black" }} to="/sign-in">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Log in
              </MenuItem>
            </Link>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
