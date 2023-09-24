import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";

import "./style.scss";
import UserComponent from "./UserComponent/UserComponent";
import SearchComponent from "./SearchComponent/SearchComponent";
import CategoryComponent from "./CategoryComponent/CategoryComponent";

const HeaderComponent = () => {
  const category = ["New & Feature", "Jordan", "Runing", "Football"];

  return (
    <Grid container className="header">
      <Grid className="header__logo" item xs={3}>
        SPACE SNEAKERS
      </Grid>
      <Grid className="header__category" item xs={6}>
        {category.map((item) => (
          <CategoryComponent name={item} key={item} />
        ))}
      </Grid>
      <Grid className="header__icon" item xs={3}>
        <SearchComponent />
        <Badge badgeContent={4} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
        <UserComponent />
      </Grid>
    </Grid>
  );
};

export default HeaderComponent;
