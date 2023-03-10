import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css';
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUpComponent";
import LogIn from "./components/LogInComponent";
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
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<LogIn/>}></Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
