 import React, { useState, useEffect } from "react";
import axios from "axios";
import Pg from "../Pg";
import PGList from "../../views/PGList";
const Homescreen = ({pgList, setPgList}) => {
  const [pgname, setpgName] = useState("");

  return <>{pgList ? <PGList pgs={pgList} /> : <h1>Not Found</h1>}</>;
};
export default Homescreen;


{/*
import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="homepage">
        <div className="home-div">
          <h1 className="greet">Welcome!</h1>
          <p className="homeinfo">We provide pg booking service.</p>
          <p className="homeinfo">You can take room on rent or if you have extra rooms, you can put it on rent for earning some money.</p>
          <NavLink
            to="./AddPGModal/index"
            type="button"
            className="Add-button"
          >
            Add a pg
          </NavLink>
          <NavLink
            to="/"
            type="button"
            className="Book-button"
          >
            Book a pg
          </NavLink>
       
        </div>
      </div>
      <div className="d-flex flex-column h-100">
      <footer className="footer mt-auto py-3">
  <div className="container">
    © sakshi shah and jay thakkar
  </div>
</footer>
</div>
    </>
  );
}

export default Home;
*/}