import React from 'react'
import { Input } from "antd";
const { Search } = Input;

function SearchBar() {
  return (
    <Search
    placeholder="Search for PG and Hostel Room"
    enterButton
    style={{
      width: 500,
      margin: "20px auto",
    }}
    size="large"
    className="pg-search-bar"
  />
  )
}

export default SearchBar