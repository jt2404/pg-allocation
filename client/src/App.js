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
import PgDetails from "./components/PgDetails";
import Homescreen from "./components/HomeScreen/Home";
const App = () => {
  const user = localStorage.getItem("token")
  console.log(user)
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
          <Route path="/PgDetails/:id" element={<PgDetails></PgDetails>}></Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
