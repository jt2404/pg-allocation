import React, { useState, useEffect } from "react";
import axios from "axios";
import Pg from "../Pg";
import { useStore } from "./../../context/pg_store";
import { fetchPgList } from "./../../apicalls";
import PGCard from "../PGCard";
import { Spin } from "antd";
import Filters from "../Filters";
import { Row, Col, Input, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
const { Search } = Input;

const Homescreen = () => {
  const { state, methods } = useStore();
  const [pgSearchValue, setPgSearchValue] = useState("");

  useEffect(() => {
    fetchPgList(methods.updatePgList, methods.updatePgLoader, pgSearchValue);
  }, [pgSearchValue]);

  const handleSearchChange = (val) => {
    setPgSearchValue(val);
  };

  return (
    <>
      <Row justify="space-around">
        <Col span={3}></Col>
        <Col span={16}>
          <Search
            placeholder="Search for PG and Hostel Room"
            enterButton
            style={{
              width: 500,
              margin: "50px 200px",
            }}
            size="large"
            className="pg-search-bar"
            onSearch={handleSearchChange}
          />
        </Col>
        <Col span={3} style={{ margin: "50px 0px" }}>
          <Filters />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {state.isPgLoading ? (
            <Spin size="large" />
          ) : state.pgList && state.pgList.length ? (
            <PGCard pgs={state.pgList} />
          ) : (
            <h1> No data found </h1>
          )}
        </Col>
      </Row>
    </>
  );
};
export default Homescreen;
