import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Headerbar from "../Header.js";
const { Component } = React;
const PgDetails = () => {
  let { id } = useParams();
  const [pgInfo, setPgInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pgdata = await axios.get(`http://localhost:8000/pg/${id}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        if (pgdata?.status === 200) {
          setPgInfo(pgdata?.data);
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  console.log(pgInfo?.images);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <p>Pg details name <h1> {pgInfo.name}</h1> </p>
  );
};
export default PgDetails;
