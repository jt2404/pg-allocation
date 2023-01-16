import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { Row, Col, Avatar, Layout, Button, Input } from "antd";
import logo from '../assests/images/logo.png'
const { Header } = Layout;
const { Search } = Input;

const HeaderBar = () => {
  const navigate = useNavigate();
  const handleLocation = () => {
    navigate("/");
  };

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            float: "left",
          }}
        >
          <img
            src={logo}
            alt="Find-My-PG-logo"
            className="header-logo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleLocation();
            }}
          />
        </div>
        <Row justify="space-between">
          <Col span={6}>
            <Link
              to={{
                pathname: "/",
              }}
            >
              <p style={{ color: "white" }}>Home</p>
            </Link>
          </Col>
          <Col span={6}>
            <p style={{ color: "white" }}>Add PG</p>
          </Col>
          <Col span={5}>
            <p>
              <Link
                style={{ color: "white" }}
                to="/login"
              >
                Log in
              </Link>
            </p>
          </Col>
          <Col span={5}>
            <p>
              <Link
              style={{ color: "white" }}
              to="/signup"
              >
                Sign up
              </Link>{" "}
            </p>
          </Col>
          <Col span={2}>
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              U
            </Avatar>
          </Col>
        </Row>
      </Header>
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
    </>
  );
};

export default HeaderBar;
