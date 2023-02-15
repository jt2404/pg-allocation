import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const PgDetails = () => {
  let { id } = useParams();
  const [pgInfo, setPgInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pgdata = await axios.get(`http://localhost:8000/pg/${id}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        console.log(pgdata);
        setPgInfo(pgdata?.data);
        setLoading(false);
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
      <p>Pg details name <h1> {pgInfo.name}</h1> </p>
  );
};
export default PgDetails;
