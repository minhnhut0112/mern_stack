import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";
const SearchComponent = () => {
  return (
    <div className="search">
      <SearchIcon id="search-icon" />
      <input placeholder="Search..." />
    </div>
  );
};

export default SearchComponent;
