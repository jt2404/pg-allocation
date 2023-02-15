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
    <>
      <div class="card-wrapper">
        <div class="card-for-details">
          <div class="product-imgs">
            <div class="img-display">
              <div class="img-showcase">
                <img src={pgInfo?.images[0]} alt="shoe image" />
              </div>
            </div>
          </div>
          <div className="product-content">
            <div class="product-rating">
              {/* <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span>4.7(21)</span> */}
            </div>
            <div class="product-price">
              {/* <p class="last-price">
                Old Price: <span>$257.00</span>
              </p>
              <p class="new-price">
                New Price: <span>$249.00 (5%)</span>
              </p> */}
            </div>
            <div class="product-detail">
              <h2> {pgInfo?.name}</h2>
              {/* <p>
              {pgInfo?.description}
              </p> */}
              
              <ul>
                <li>
                  Address: <span>{pgInfo?.address}</span>
                </li>
                <li>
                  Available: <span>in stock</span>
                </li>
                <li>
                  Category: <span>{pgInfo?.roomtype}</span>
                </li>
                <li>
                  Number Of Rooms Available: <span>{pgInfo?.availableroom}</span>
                </li>
                <li>
                  Price: <span>{pgInfo?.price}</span>
                </li>
                
              </ul>
              <p>
              {pgInfo?.description}
              </p>
            </div>
            
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PgDetails;
