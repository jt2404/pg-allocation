import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUpComponent";
import LogIn from "./components/LogInComponent";
import Homescreen from "./components/HomeScreen/Home";
import PgDetails from "./components/PgDetails";
import HeaderBar from "./components/Header";
import Map from "./components/Map";
import BookingHistory from "./views/BookingHistory";
import { Layout } from "antd";
const { Footer } = Layout;
const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Router>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<Navigation />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route
            path="/pgdetails/:id"
            element={<PgDetails user={user} />}
          ></Route>
          <Route path="/history" element={<BookingHistory userId={user?._id} role={user?.stype}/>}></Route>
        </Routes>
        <Footer style={{ textAlign: "center", backgroundColor: "#212529" }}>
          <p className="text-center" style={{ color: "white", padding: "5px" }}>
            Copyright @2023 | Designed With by <a href="#">StayEase</a>
          </p>
          <ul className="social-icons" style={{ padding: "2px" }}>
            <li>
              <a className="facebook" href="#">
                <i class="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a className="twitter" href="https://mobile.twitter.com/jay_24_thakkar">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a className="instagram" href="#">
                <i class="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a className="linkedin" href="#">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </Footer>
      </Router>
    </>
  );
};
export default App;
