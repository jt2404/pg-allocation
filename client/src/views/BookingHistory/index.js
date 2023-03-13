import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Row,
  Carousel,
  Col,
  Tag,
  List,
  Card,
  Button,
  Rate,
  Form,
  message,
  Tooltip,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

function BookingHistory({ userId, role }) {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [bookingInfoForPGOwner, setBookingInfoForPGOwner] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingDetails = await axios.get(
          `http://localhost:8000/booking/${userId}`,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (bookingDetails?.status === 200) {
          setBookingInfo(bookingDetails?.data);
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
    };
    const fetchUserBookingDetails = async () => {
      try {
        const userBookingDetails = await axios.get(
          "http://localhost:8000/bookings",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (userBookingDetails?.status === 200) {
          setBookingInfoForPGOwner(userBookingDetails?.data);
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
    };
    if (role !== "admin") {
      fetchBooking();
    } else {
      fetchUserBookingDetails();
    }
  }, [userId]);
  console.log(bookingInfoForPGOwner);

  return (
    <div>
      <div className="center">
        <h3>Booking History</h3>
      </div>
      <Row justify="space-around">
        {role !== "admin"
          ? bookingInfo.map((booking) => {
              return (
                <>
                  <div className="titleholder">
                    <Col
                      className="gutter-row"
                      span={8}
                      style={{ margin: "1rem" }}
                    >
                      <Card
                        title={
                          <p style={{ textAlign: "center", margin: "auto" }}>
                            {booking?.pg?.name}
                          </p>
                        }
                        style={{ width: 300 }}
                      >
                        <p>
                          <b>Address:</b> {booking?.pg?.address}
                        </p>
                        <p
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <b>City : </b>
                          {booking?.pg?.city}
                        </p>
                        <br></br>
                        <p
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <b>Price:</b>
                          <Tag
                            color="#00d363"
                            style={{ marginLeft: "0.5rem", fontWeight: "600" }}
                          >
                            ₹ {booking?.cost}
                          </Tag>
                        </p>

                        <p>
                          <b>BookedOn:</b> {booking?.bookedOn}
                        </p>
                        <p>
                          <b>StartDate:</b> {booking?.effective_from}
                        </p>
                        <p>
                          <b>EndDate:</b> {booking?.effective_to}
                        </p>
                        {/* <p style={{ fontWeight: "600", color: "gray" }}>
                  *<i>{booking.pg.description}</i>
                </p> */}
                      </Card>
                    </Col>
                  </div>
                </>
              );
            })
          : bookingInfoForPGOwner.map((booking) => {
              return booking.map((details) => {
                return (
                  <>
                    <div className="titleholder">
                      <Col
                        className="gutter-row"
                        span={8}
                        style={{ margin: "1rem" }}
                      >
                        <Card
                          title={
                            <p style={{ textAlign: "center", margin: "auto" }}>
                              {details?.pgInfo}
                            </p>
                          }
                          style={{ width: 300 }}
                        >
                          <p>
                            <b>Name:</b> {details?.userDetail?.name}
                          </p>
                          <p>
                            <b>Email: </b>
                            {details?.userDetail?.email}
                          </p>
                          <p>
                            <b>Contact No:</b> {details?.userDetail?.phone}
                          </p>
                          {/* <br></br> */}
                          <p
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <b>Price:</b>
                            <Tag
                              color="#00d363"
                              style={{
                                marginLeft: "0.5rem",
                                fontWeight: "600",
                              }}
                            >
                              ₹ {details?.cost}
                            </Tag>
                          </p>

                          <p>
                            <b>Booked on:</b>{" "}
                            {details?.bookedOn &&
                              dayjs(details?.bookedOn).format("DD/MM/YYYY")}
                          </p>
                          <p>
                            <b>StartDate:</b>{" "}
                            {details?.effectiveFrom
                              ? dayjs(details?.effectiveFrom).format(
                                  "DD/MM/YYYY"
                                )
                              : "-"}
                          </p>
                          <p>
                            <b>EndDate:</b>{" "}
                            {details?.effectiveTo
                              ? dayjs(details?.effectiveTo).format("DD/MM/YYYY")
                              : "-"}
                          </p>
                          {/* <p style={{ fontWeight: "600", color: "gray" }}>
                  *<i>{booking.pg.description}</i>
                </p> */}
                        </Card>
                      </Col>
                    </div>
                  </>
                );
              });
            })}
      </Row>
    </div>
  );
}

export default BookingHistory;
