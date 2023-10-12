import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useState } from "react";
import "./style.scss";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, CircularProgress } from "@mui/material";
import avt from "../../assets/image/avata.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slices/userSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const user = useSelector((state) => state.user);
  const disPatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [avata, setAvata] = useState("");

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUser(user?.id, user?.access_token);
    }
  }, [mutation]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    disPatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      access_token: user?.access_token,
    });
  };

  return (
    <div>
      <h3 style={{ marginLeft: "80px", marginTop: "40px" }}>My Profile</h3>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            indicatorColor="grey"
          >
            <Tab
              style={{ color: "black" }}
              label="Account Details"
              {...a11yProps(0)}
            />

            <Tab
              style={{ color: "black" }}
              label="Delivery Addresses"
              {...a11yProps(1)}
            />
            <Tab
              style={{ color: "black" }}
              label="Change Password"
              {...a11yProps(2)}
            />
          </Tabs>
        </Grid>
        <Grid item xs={5}>
          <TabPanel value={value} index={0}>
            <Avatar
              alt="Remy Sharp"
              src={avt}
              sx={{ width: 100, height: 100 }}
            />
            <Button
              style={{
                margin: "30px 0px",
                backgroundColor: "white",
                color: "black",
              }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>

            <InputComponent
              value={name}
              handleOnChange={handleOnChangeName}
              type="text"
              label="Full Name"
            />
            <InputComponent
              value={email}
              handleOnChange={handleOnChangeEmail}
              type="email"
              label="Email"
            />
            <InputComponent
              value={phone}
              handleOnChange={handleOnChangePhone}
              type="text"
              label="Phone"
            />
            <Button
              onClick={handleUpdate}
              variant="outlined"
              sx={{
                width: { xs: "30%", md: "20%" },
                height: "40px",
                marginBottom: "20px",
              }}
            >
              {isLoading ? (
                <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
              ) : (
                <div>Update</div>
              )}
            </Button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
