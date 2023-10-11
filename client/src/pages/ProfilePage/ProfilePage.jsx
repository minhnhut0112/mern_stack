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

  const [name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleOnChangeFullname = (value) => {
    setFullname(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
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
            sx={{
              borderRight: 1,
              borderColor: "grey",
            }}
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
