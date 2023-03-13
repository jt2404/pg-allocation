import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Card, Tooltip, Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile({ name, email }) {
  const navigate = useNavigate();
  const avatarColor = ["#87d068", "#f56a00", "#1890ff"];
  function getColor() {
    return avatarColor[Math.floor(Math.random() * avatarColor.length)];
  }
  function nameInitials(name) {
    const fullName = name?.split(" ");
    const initials = fullName.shift()?.charAt(0) + fullName.pop()?.charAt(0);
    return initials.toUpperCase();
  }
  function avatarUI() {
    return (
      <div className="avatar-container">
        <div className="avatar-edit-icon">
          <Tooltip title="Edit Profile Picture">
            <a href="#" className="avatar-edit-anchor" target="_blank">
              <EditOutlined />
            </a>
          </Tooltip>
        </div>
        <Avatar style={{ backgroundColor: getColor() }}>
          {nameInitials(name)}
        </Avatar>
      </div>
    );
  }
  function profileDescription() {
    return (
      <>
        <a href="#" style={{ color: "#0B294E" }}>
          <Tooltip>{name}</Tooltip>
        </a>
        <p className="profile-widget-email" style={{ margin: 0 }}>
          <span>{email}</span>
        </p>
      </>
    );
  }
  function signOut() {
    return (
      <a
        className="url"
        onClick={() => {
          LogOut();
        }}
        href="#"
      >
        Sign out
      </a>
    );
  }
  function viewBooking() {
    return <Link to="/history">View Booking</Link>;
  }
  const LogOut = async () => {
    const res = await axios.put("/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }
  };
  function MenuProfile() {
    return (
      <Menu className="avtar-profile-menu">
        <Card size="small" style={{ width: 300 }}>
          <Card.Meta
            avatar={avatarUI()}
            description={profileDescription()}
          ></Card.Meta>
        </Card>
        <Menu.Item key={"signout"}>{signOut()}</Menu.Item>
        <Menu.Item key={"viewbooking"}>{viewBooking()}</Menu.Item>
      </Menu>
    );
  }
  return (
    <div className="avtar-wrapper">
      <Dropdown className="avatar-dropdown" overlay={MenuProfile()}>
        <Avatar icon={<UserOutlined />}></Avatar>
      </Dropdown>
    </div>
  );
}

export default UserProfile;
