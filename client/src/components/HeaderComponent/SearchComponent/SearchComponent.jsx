import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";
const SearchComponent = () => {
  return (
    <div className="search">
      <SearchIcon style={{ color: "black" }} id="search-icon" />
      <input placeholder="Search..." type="search" />
    </div>
  );
};

export default SearchComponent;
