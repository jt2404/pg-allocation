import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Avatar,
} from "antd";
import { DollarOutlined, UserOutlined } from "@ant-design/icons";
import "./index.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Navigation, Scrollbar, A11y, Autoplay } from "swiper";

import ac from "../../assests/images/ac.png";
import { Pagination } from "swiper";
import kr1 from "../../assests/images/kr1.jpg";

import Headerbar from "../Header.js";
import "./index.css";
import BookPGModal from "../BookPGModal";
import dayjs from "dayjs";
import AddPGModal from "../AddPGModal";
import AddRatingModal from "../AddRatingModal";
// import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./Avatar";
import AddImageModal from "../AddImageModal";
const { Component } = React;

const PgDetails = ({ user }) => {
  let { id } = useParams();
  const [pgInfo, setPgInfo] = useState({});
  const [ratingInfo, setRatingInfo] = useState({});
  const [ratingHistory, setRatingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [isEditPGModalVisible, setIsEditPGModalVisible] = useState(false);
  const [isAddRatingVisible, setIsAddRatingVisible] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [range, setRange] = useState([]);
  const [cost, setCost] = useState(0);
  const [loadingForBooking, setLoadingForBooking] = useState(false);
  const [pgData, setPgData] = useState({});
  const [ratingData, setRatingData] = useState({});
  const [imageData, setImageData] = useState({});
  const [isUserGaveRatingHistory, setIsUserGaveRatingHistory] = useState(false);
  const [isImageUploadModalVisible, setIsImageUploadModalVisible] =
    useState(false);

  const avatarColor = ["#87d068", "#f56a00", "#1890ff"];
  function getColor() {
    return avatarColor[Math.floor(Math.random() * avatarColor.length)];
  }
  function nameInitials(name) {
    const fullName = name?.split(" ");
    const initials = fullName.shift()?.charAt(0) + fullName.pop()?.charAt(0);
    return initials.toUpperCase();
  }

  const handleStateChangeModal = () => {
    setIsBookModalVisible(!isBookModalVisible);
  };

  const handleEditChangeModal = () => {
    setIsEditPGModalVisible(!isEditPGModalVisible);
  };

  const handleAddRatingModal = () => {
    setIsAddRatingVisible(!isAddRatingVisible);
  };

  const handleUploadImageModal = () => {
    setIsImageUploadModalVisible(!isImageUploadModalVisible);
  };

  const handleCancel = () => {
    setIsEditPGModalVisible(false);
  };

  useEffect(() => {
    if (pgInfo) {
      const INITIAL_PG_DATA = {
        id: id,
        name: pgInfo?.name,
        address: pgInfo?.address,
        city: pgInfo?.city,
        district: pgInfo?.district,
        noofrooms: pgInfo?.noofrooms,
        roomtype: pgInfo?.roomtype,
        price: pgInfo?.price,
        description: pgInfo?.description,
        sharingPerRoom: pgInfo?.sharingPerRoom,
        userId: user?._id
      };
      setPgData(INITIAL_PG_DATA);
    }
  }, [pgInfo]);

  const handleSubmit = async () => {
    setLoadingForBooking(true);
    const bookingData = {
      pgId: id,
      userId: user?._id,
      range: range,
      bookedOn: dayjs().format("YYYY-MM-DD"),
      cost: cost,
    };
    const res = await axios.post(
      "http://localhost:8000/addBooking",
      bookingData,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (res.status === 200) {
      message.success("PG Booked successfully");
      setRange([]);
      setCost(0);
      setLoadingForBooking(false);
      setIsBookModalVisible(false);
    } else {
      message.error(res?.message);
    }
  };

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
    const fetchRating = async () => {
      try {
        const ratingDetails = await axios.get(
          `http://localhost:8000/getrating/${id}`,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (ratingDetails?.status === 200) {
          setRatingInfo(ratingDetails?.data);
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
    };

    fetchRating();

    const fetchRatingHistory = async () => {
      try {
        const ratingHistoryData = await axios.get(
          `http://localhost:8000/getratingHistory/${id}`,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (ratingHistoryData?.status === 200) {
          setRatingHistory(ratingHistoryData?.data);
          isUserHasGivenFeedback(ratingHistoryData?.data);
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.result === "Please provide a valid token") {
          localStorage.removeItem("user");
        }
        setLoading(false);
      }
    };
    fetchRatingHistory();
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }
  function isUserHasGivenFeedback(data) {
    const userWithFeedback = data?.filter(
      (history) => history?.user === user?._id
    );
    if (userWithFeedback?.length > 0) {
      setIsUserGaveRatingHistory(true);
    }
  }
  return (
    <>
      <Row>
        <Col span={15} style={{ padding: "60px" }}>
          <Carousel autoplay effect="fade">
            {pgInfo?.images?.map((image) => (
              <div>
                <img
                  src={image}
                  alt="PG Image"
                  style={{
                    height: "70%",
                    display: "block",
                    alignItems: "center",
                    borderRadius: "8px",
                    // paddingLeft: "40px",
                    // paddingRight: "auto",
                    width: "100%",
                    // paddingTop: "50px",
                  }}
                ></img>
              </div>
            ))}
          </Carousel>
          {user?.stype === "admin" ? (
            <Row justify="end">
              <Col span={15}>
                <AddImageModal
                  pgId={id}
                  imageData={imageData}
                  setImageData={setImageData}
                  isImageUploadModalVisible={isImageUploadModalVisible}
                  setIsImageUploadModalVisible={setIsImageUploadModalVisible}
                  form={form2}
                />
                <Button
                  style={{ margin: ".5rem" }}
                  onClick={() => handleUploadImageModal()}
                >
                  Add Image
                </Button>
              </Col>
            </Row>
          ) : (
            !isUserGaveRatingHistory && (
              <Row justify="end">
                <Col span={15}>
                  <AddRatingModal
                    isAddRatingVisible={isAddRatingVisible}
                    ratingData={ratingData}
                    setRatingData={setRatingData}
                    form={form1}
                    setIsAddRatingVisible={setIsAddRatingVisible}
                    pgId={id}
                    userId={user?._id}
                  />
                  <Button
                    style={{ margin: ".5rem" }}
                    type="primary"
                    onClick={() => handleAddRatingModal()}
                  >
                    Add Feedback
                  </Button>
                </Col>
              </Row>
            )
          )}
        </Col>
        <Col span={8} style={{ paddingTop: "60px" }}>
          {/* <Row>
            <h3>{pgInfo?.name}</h3>
          </Row> */}
          <div id="pricing" className="block pricingBlock bgGray">
            <div className="container-fluid">
              <div className="titleHolder">
                <h2>{pgInfo?.name}</h2>

                <p>
                  <i class="fa fa-map-marker"></i>&nbsp;{pgInfo?.address}
                </p>
              </div>
              <Card title="Basic Information">
                <Row>
                  <p>City: {pgInfo?.city}</p>
                </Row>
                <Row>
                  <p>District: {pgInfo?.district}</p>
                </Row>
                <Row>
                  {}{" "}
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    {" "}
                    Price:
                    <Tag
                      color="#00d363"
                      style={{ marginLeft: "0.5rem", fontWeight: "600" }}
                    >
                      ₹ {pgInfo?.price}
                    </Tag>
                  </span>
                </Row>
                <Row style={{ paddingTop: ".5rem" }}>
                  <p style={{ display: "inline-flex", alignItems: "center" }}>
                    Available Rooms: <UserOutlined />
                    {pgInfo?.availableroom}
                  </p>
                </Row>
                <p>Room Type: {pgInfo?.roomtype}</p>
                <p style={{ fontWeight: "600", color: "gray" }}>
                  *<i>{pgInfo?.description}</i>
                </p>
                <Row justify="space-between">
                  <Col span={16}>
                    <p>
                      <Rate
                        allowHalf
                        disabled
                        value={ratingInfo?.averageRating}
                      />{" "}
                      {"(" + ratingInfo?.totalRateCount
                        ? ratingInfo?.totalRateCount
                        : 0 + ")"}
                    </p>
                  </Col>
                  <Col span={8}>
                    <BookPGModal
                      isBookModalVisible={isBookModalVisible}
                      setIsBookModalVisible={setIsBookModalVisible}
                      form={form}
                      range={range}
                      setRange={setRange}
                      loadingForBooking={loadingForBooking}
                      handleSubmit={handleSubmit}
                      price={pgInfo?.price}
                      cost={cost}
                      setCost={setCost}
                    />
                    <AddPGModal
                      isModalOpen={isEditPGModalVisible}
                      setIsModalVisible={setIsEditPGModalVisible}
                      pgData={pgData}
                      setPgData={setPgData}
                      isEdit={true}
                      handleCancel={handleCancel}
                      // handleCancel={handleCancel}
                      form={form}
                    />
                    {user?.stype !== "admin" ? (
                      <>
                        <Tooltip
                          title={
                            pgInfo?.totalAccomodation === 0
                              ? "PG is full"
                              : null
                          }
                        >
                          <Button
                            type="primary"
                            onClick={handleStateChangeModal}
                            disabled={pgInfo?.totalAccomodation === 0}
                          >
                            Book now
                          </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <Button
                        type="primary"
                        onClick={handleEditChangeModal}
                        loading={loading}
                      >
                        Edit PG Details
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
          {/* <Row>
            <span style={{ display: "inline-block", alignItems: "center" }}>
              {" "}
              <i class="fa fa-map-marker"></i>&nbsp; Address: {pgInfo?.address}
            </span>
          </Row> */}

          {/* <p>City: {pgInfo?.city}</p>
          <p>District: {pgInfo?.district}</p>
          <Row>
            {}{" "}
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              {" "}
              Price:
              <Tag
                color="#00d363"
                style={{ marginLeft: "0.5rem", fontWeight: "600" }}
              >
                ₹ {pgInfo?.price}
              </Tag>
            </span>
          </Row>
          <p style={{ display: "inline-flex", alignItems: "center" }}>
            Available Rooms: <UserOutlined />
            {pgInfo?.availableroom}
          </p>
          <p>Room Type: {pgInfo?.roomtype}</p>
          <p>{pgInfo?.description}</p> */}
        </Col>
      </Row>
      {ratingHistory?.length > 0 && (
        <Row>
          <Col span={24} style={{ padding: "60px" }}>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              // navigation={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {ratingHistory?.map((history) => {
                return (
                  <SwiperSlide style={{ backgroundColor: "#f5f5f5" }}>
                    {/* <Avatar
                      style={{ width: "100px", height: "100px" }}
                      avatarStyle="Circle"
                      topType='LongHairMiaWallace'
                      accessoriesType='Prescription02'
                      hairColor='BrownDark'
                      facialHairType='Blank'
                      clotheType='Hoodie'
                      clotheColor='PastelBlue'
                      eyeType='Happy'
                      eyebrowType='Default'
                      mouthType='Smile'
                      skinColor='Light'
                      // {...generateRandomAvatarOptions()}
                    /> */}
                    {/* <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                      className="rounded-circle shadow-4"
                      style={{ width: "150px" }}
                      alt="Avatar"
                    /> */}
                    <Avatar style={{ backgroundColor: getColor() }}>
                      {nameInitials(history?.userInfo?.name)}
                    </Avatar>
                    <Row justify="center">
                      <p>{history?.userInfo?.name}</p>
                    </Row>
                    <Row justify="center">
                      <div>
                        {" "}
                        <img
                          src="https://annedece.sirv.com/Images/commos.png"
                          class="comms"
                          style={{ width: "40px", height: "auto" }}
                        ></img>
                        <p className="text-muted" style={{ padding: "5px"}}>
                          {history?.comment}
                        </p>
                      </div>
                    </Row>
                    <Row justify="center">
                      <Rate
                        defaultValue={history?.rate}
                        disabled
                        allowHalf
                      ></Rate>
                    </Row>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      )}
      {/* {!isUserGaveRatingHistory && (
        <Row>
          <AddRatingModal
            isAddRatingVisible={isAddRatingVisible}
            ratingData={ratingData}
            setRatingData={setRatingData}
            form={form1}
            setIsAddRatingVisible={setIsAddRatingVisible}
            pgId={id}
            userId={user?._id}
          />
          <Button type="primary" onClick={() => handleAddRatingModal()}>
            Add Feedback
          </Button>
        </Row>
      )} */}
    </>
  );
};

export default PgDetails;
