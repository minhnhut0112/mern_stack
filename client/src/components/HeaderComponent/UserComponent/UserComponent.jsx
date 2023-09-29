import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import avatar from "../../../assets/image/avata.jpg";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const UserComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={avatar}></Avatar>
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
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "black" }} to="/myprofile">
            My Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "black" }} to="/myorder">
            My Order
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "black" }} to="/sign-in">
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Log in
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserComponent;
