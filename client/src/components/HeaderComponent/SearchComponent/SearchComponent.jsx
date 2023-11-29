import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";
const SearchComponent = (props) => {
  return (
    <div className="search">
      <SearchIcon style={{ color: "black" }} id="search-icon" {...props} />
      <input placeholder="Search..." {...props} type="search" readOnly />
    </div>
  );
};

export default SearchComponent;
