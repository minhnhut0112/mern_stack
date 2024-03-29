import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../../service/UserService";
import { resetUser } from "../../../redux/slices/userSlice";
import { useState } from "react";
import { useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { removeAllOrderProduct } from "../../../redux/slices/orderSlice";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  const disPatchOrder = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await UserService.logoutUser();
    disPatch(resetUser());
    disPatchOrder(removeAllOrderProduct());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/sign-in");
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
            <div
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              style={{ display: "flex", alignItems: "center" }}
            >
              {userName}
              <Avatar
                src={user?.avatar}
                style={{ width: "20px", height: "20px", marginLeft: "10px" }}
              >
                {user?.avatar ? (
                  userName
                ) : (
                  <>
                    <AccountCircleIcon />
                  </>
                )}
              </Avatar>
            </div>
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
            <Link style={{ color: "black" }} to="/profile">
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
            </Link>

            <div style={{ color: "black" }} onClick={handleClose}>
              <MenuItem
                onClick={() =>
                  navigate("/my-order", {
                    state: {
                      id: user?.id,
                      token: user?.access_token,
                    },
                  })
                }
              >
                My Order
              </MenuItem>
            </div>
            {user?.isAdmin && (
              <div>
                <Divider />
                <Link style={{ color: "black" }} to="/system/admin">
                  <MenuItem onClick={handleClose}>System Manager</MenuItem>
                </Link>
              </div>
            )}
            <Divider />
            <div onClick={handleLogout}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Log out
              </MenuItem>
            </div>
          </Menu>
        </div>
      ) : (
        <div>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontSize: "20px",
            }}
            to="/sign-in"
          >
            Log in <PersonOutlineIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
