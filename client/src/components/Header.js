// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./index.css";
// import { Row, Col, Avatar, Layout, Button, Input } from "antd";
// import logo from '../assests/images/logo.png'
// const { Header } = Layout;
// const { Search } = Input;

// const HeaderBar = () => {
//   const navigate = useNavigate();
//   const handleLocation = () => {
//     navigate("/");
//   };

//   return (
//     <>
//       <Header
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1,
//           width: "100%",
//         }}
//       >
//         <div
//           style={{
//             float: "left",
//           }}
//         >
//           <img
//             src={logo}
//             alt="Find-My-PG-logo"
//             className="header-logo"
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               handleLocation();
//             }}
//           />
//         </div>
//         <Row justify="space-between">
//           <Col span={6}>
//             <Link
//               to={{
//                 pathname: "/",
//               }}
//             >
//               <p style={{ color: "white" }}>Home</p>
//             </Link>
//           </Col>
//           <Col span={6}>
//             <p style={{ color: "white" }}>Add PG</p>
//           </Col>
//           <Col span={5}>
//             <p>
//               <Link
//                 style={{ color: "white" }}
//                 to="/login"
//               >
//                 Log in
//               </Link>
//             </p>
//           </Col>
//           <Col span={5}>
//             <p>
//               <Link
//               style={{ color: "white" }}
//               to="/signup"
//               >
//                 Sign up
//               </Link>{" "}
//             </p>
//           </Col>
//           <Col span={2}>
//             <Avatar
//               style={{
//                 color: "#f56a00",
//                 backgroundColor: "#fde3cf",
//               }}
//             >
//               U
//             </Avatar>
//           </Col>
//         </Row>
//       </Header>
//       <Search
//         placeholder="Search for PG and Hostel Room"
//         enterButton
//         style={{
//           width: 500,
//           margin: "20px auto",
//         }}
//         size="large"
//         className="pg-search-bar"
//       />
//     </>
//   );
// };

// export default HeaderBar;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import {
  Row,
  Col,
  Avatar,
  Layout,
  Button,
  Input,
  Tooltip,
  Card,
  Form,
} from "antd";
import logo from "../assests/images/WhatsApp Image 2023-02-15 at 13.28.35.jpg";
import AddPGModal from "./AddPGModal/index";
import Homescreen from "./HomeScreen/Home";
import Filters from "./Filters";
import { useStore } from "../context/pg_store";
import UserProfile from "./UserProfile";
import MapModal from "./MapModal";

const { Header } = Layout;
const { Meta } = Card;

const HeaderBar = () => {
  function INITIAL_PG_DATA(userId) {
    const initialData = {
      name: "",
      address: "",
      city: "",
      district: "",
      noofrooms: 1,
      roomtype: "Non-AC",
      price: 1,
      description: "",
      image: null,
      userId: userId,
    };
    return initialData;
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("user"))?.stype
  );
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const user = localStorage.getItem("user");
  const [pgData, setPgData] = useState(INITIAL_PG_DATA(JSON.parse(user)?._id));
  const [mapPGModalVisible, setMapPGModalVisible] = useState(false);
  const [form] = Form.useForm();

  function handleAddPGModal() {
    setIsModalVisible(!isModalVisible);
  }
  function handleShowPGOnMapModal() {
    setMapPGModalVisible(!mapPGModalVisible);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
    setPgData(INITIAL_PG_DATA);
    form.resetFields();
  };
  // var options = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0,
  // };
  // function success(pos) {
  //   console.log(pos);
  //   let crd = pos.coords;
  //   console.log("Your current position is:");
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }
  // function errors(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }
  // function findLocation() {
  //   navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //     if (result.state === "granted") {
  //       navigator.geolocation.getCurrentPosition(success);
  //     } else if (result.state === "prompt") {
  //       navigator.geolocation.getCurrentPosition(success, errors, options);
  //     }
  //   });
  // }
  const navigate = useNavigate();
  const handleLocation = () => {
    navigate("/");
  };

  const handleLogOut = async () => {
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

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#05152a",
        }}
      >
        <Row justify="space-between">
          <Col span={6}>
            <img
              src={logo}
              alt="Find-My-PG-logo"
              className="header-logo"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleLocation();
              }}
            />
          </Col>

          <Col span={4}>
            <p>
              <Button
                style={{ color: "white", marginTop: "10px" }}
                type="link"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </p>
          </Col>
          <Col span={4}>
            <p>
              {userRole !== "user" && userRole === "admin" ? (
                <Button
                  style={{ color: "white", marginTop: "10px" }}
                  type="link"
                  onClick={handleAddPGModal}
                >
                  Add PG
                </Button>
              ) : (
                userRole === "user" && (
                  <Button
                    style={{ color: "white", marginTop: "10px" }}
                    type="link"
                    onClick={handleShowPGOnMapModal}
                  >
                    PG on Map
                  </Button>
                )
              )}
            </p>
            <AddPGModal
              isModalOpen={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              pgData={pgData}
              setPgData={setPgData}
              handleCancel={handleCancel}
              form={form}
              userId={JSON.parse(user)?._id}
            />
            <MapModal mapPGModalVisible={mapPGModalVisible} setMapPGModalVisible={setMapPGModalVisible} />
          </Col>
          {!user && (
            <Col span={5}>
              <p>
                <Button
                  type="link"
                  style={{ color: "white", marginTop: "10px" }}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
              </p>
            </Col>
          )}
          {!user && (
            <Col span={4}>
              <p>
                <Button
                  type="link"
                  style={{ color: "white", marginTop: "10px" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>{" "}
              </p>
            </Col>
          )}
          {/* {user && (
            <Col span={5}>
              <p>
                <Button
                  style={{ color: "white", marginTop: "10px" }}
                  type="link"
                  onClick={handleLogOut}
                >
                  Log out
                </Button>
              </p>
            </Col>
          )} */}
          {user && (
            <Col span={2} style={{ marginTop: "10px" }}>
              <UserProfile
                name={JSON.parse(user)?.name}
                email={JSON.parse(user)?.email}
              />
            </Col>
          )}
        </Row>
      </Header>
    </>
  );
};

export default HeaderBar;
