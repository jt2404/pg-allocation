import React, { useState, useEffect } from "react";
import axios from "axios";
import Pg from "../Pg";
import PGList from "../../views/PGList";
const Homescreen = ({pgList, setPgList}) => {
  const [pgname, setpgName] = useState("");

  return <>{pgList ? <PGList pgs={pgList} /> : <h1>Not Found</h1>}</>;
};
export default Homescreen;
