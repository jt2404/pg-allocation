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
import { Row, Col, Avatar, Layout, Button, Input, Tooltip, Card } from "antd";
import logo from "../assests/images/Screenshot_20230120_133416.png";
import AddPGModal from "./AddPGModal/index";
import Homescreen from "./HomeScreen/Home";
const { Header } = Layout;
const { Search } = Input;

const HeaderBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pgSearchValue, setPgSearchValue] = useState("");
  const [pgList, setPgList] = useState([]);
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("user"))?.stype);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const user = localStorage.getItem("user");
  console.log(JSON.parse(user)?.name);
  function handleAddPGModal() {
    setIsModalVisible(!isModalVisible);
  }
  function handleCancelAddPGModal() {
    setIsModalVisible(false);
  }
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
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    console.log(res);
    if (res.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const handleSearchChange = (val) => {
    setPgSearchValue(val);
  };

  const fetchData = async () => {
    try {
      const pgdata = await axios.get(`http://localhost:8000/getpg/${pgSearchValue}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      setPgList(pgdata?.data);
      setloading(false);
    } catch (error) {
      seterror(true);
      if (error?.response?.data?.result === "Please provide a valid token") {
        localStorage.removeItem("user");
      }
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pgSearchValue]);

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
                style={{ color: "white" }}
                type="link"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </p>
          </Col>
          {/* <Col span={5}>
            <p>
              <Link
                style={{ color: "white" }}
                to="/home"
              >
                Home
              </Link>
            </p>
          </Col> */}
          <Col span={4}>
            <p>
              {userRole !== "user" && userRole === "admin" ? (
                <Button
                  style={{ color: "white" }}
                  type="link"
                  onClick={handleAddPGModal}
                >
                  Add PG
                </Button>
              ) : (
                userRole === "user" && (
                  <Button style={{ color: "white" }} type="link">
                    PG on Map
                  </Button>
                )
              )}
            </p>
            <AddPGModal
              isModalOpen={isModalVisible}
              handleCancel={handleCancelAddPGModal}
            />
          </Col>
          {!user && (
            <Col span={5}>
              <p>
                <Button
                  type="link"
                  style={{ color: "white" }}
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
                  style={{ color: "white" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>{" "}
              </p>
            </Col>
          )}
          {user && (
            <Col span={5}>
              <p>
                <Button
                  style={{ color: "white" }}
                  type="link"
                  onClick={handleLogOut}
                >
                  Log out
                </Button>
              </p>
            </Col>
          )}
          {user && (
            <Col span={2}>
              <Tooltip
                title={
                  <div>
                    <div>{JSON.parse(user)?.name}</div>
                    <div>{JSON.parse(user)?.email}</div>
                  </div>
                }
                placement="top"
              >
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {JSON.parse(user)?.name[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            </Col>
          )}
        </Row>
      </Header>
      <Search
        placeholder="Search for PG and Hostel Room"
        enterButton
        style={{
          width: 500,
          margin: "50px auto",
        }}
        size="large"
        className="pg-search-bar"
        onSearch={handleSearchChange}
      />
      <Homescreen pgList={pgList} setPgList={setPgList} />
    </>
  );
};

export default HeaderBar;
