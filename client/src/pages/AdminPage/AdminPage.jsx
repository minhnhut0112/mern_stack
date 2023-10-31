import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminUser from "../../components/AdminUser/AdminUser";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
          <div>{children}</div>
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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HeaderAdmin />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", height: "94vh" }}
        >
          <Tab
            icon={<Inventory2OutlinedIcon />}
            iconPosition="start"
            label=" Product Manager"
            {...a11yProps(0)}
            sx={{
              width: { xs: "100px", sm: "200px", md: "250px" },
              display: "flex",
              justifyContent: "start",
            }}
          />
          <Tab
            icon={<ShoppingCartOutlinedIcon />}
            iconPosition="start"
            label="Order Manager"
            {...a11yProps(1)}
            sx={{
              width: { xs: "100px", sm: "200px", md: "250px" },
              display: "flex",
              justifyContent: "start",
            }}
          />
          <Tab
            icon={<AccountBoxOutlinedIcon />}
            iconPosition="start"
            label="User Manager"
            {...a11yProps(2)}
            sx={{
              width: { xs: "100px", sm: "200px", md: "250px" },
              display: "flex",
              justifyContent: "start",
            }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AdminProduct />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminOrder />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminUser />
        </TabPanel>
      </Box>
    </>
  );
}
