import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css';
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUpComponent";
import LogIn from "./components/LogInComponent";
import Homescreen from "./components/HomeScreen/Home";
//import BookingScreen from "./components/BookingScreen/Booking";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
                <Navigation />
            }
          ></Route>
          <Route path="/" element={<Homescreen/>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
          {/* <Route path="/book/:pgid" element={<booking></booking>}></Route>
        */}
        </Routes>
      </Router>
    </>
  );
};
export default App;
