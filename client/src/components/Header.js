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
import { Row, Col, Avatar, Layout, Button, Input } from "antd";
import logo from "../assests/images/logo.png";
import AddPGModal from "./AddPGModal/index";
import Homescreen from "./HomeScreen/Home";
const { Header } = Layout;
const { Search } = Input;

const HeaderBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pgSearchValue, setPgSearchValue] = useState("");
  const [pgList, setPgList] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  function handleAddPGModal() {
    setIsModalVisible(!isModalVisible);
  }
  function handleCancelAddPGModal() {
    setIsModalVisible(false);
  }
  const navigate = useNavigate();
  const handleLocation = () => {
    navigate("/");
  };

  const handleSearchChange = (val) => {
    setPgSearchValue(val);
  };

  const fetchData = async () => {
    try {
      const pgdata = await axios.get(`/getpg/${pgSearchValue}`, {});
      setPgList(pgdata?.data);
      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
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

          <Col span={6}>
            <p>
              <Button
                style={{ color: "white" }}
                type="link"
                onClick={handleAddPGModal}
              >
                Add PG
              </Button>
            </p>
            <AddPGModal
              isModalOpen={isModalVisible}
              handleCancel={handleCancelAddPGModal}
            />
          </Col>

          <Col span={5}>
            <p>
              <Link style={{ color: "white" }} to="/login">
                Log in
              </Link>
            </p>
          </Col>
          <Col span={5}>
            <p>
              <Link style={{ color: "white" }} to="/signup">
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
        onSearch={handleSearchChange}
      />
      <Homescreen pgList={pgList} setPgList={setPgList} />
    </>
  );
};

export default HeaderBar;
