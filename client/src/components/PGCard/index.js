import React, { Fragment, useEffect, useState } from "react";
import "./index.css";
import kr1 from "../../assests/images/kr1.jpg";
import location from "../../assests/images/location.png";
import number from "../../assests/images/number.png";
import ac from "../../assests/images/ac.png";
import { Link } from "react-router-dom";
import StarOutlined from "@ant-design/icons";
import { Row, Col, Rate } from "antd";

function PGCard({ pgs }) {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <section className="property">
        <div className="center">
          <h3>Popular PG</h3>
        </div>
        <div className="row">
          {pgs?.map((pg) => (
            <div className="column" id={pg?._id}>
              <div className="single-property">
                <div className="card">
                  <div className="property-thumb">
                    {/* <div className="property-tag">For Sale</div> */}
                    <img src={pg.images[0] || kr1} alt="Palace" />
                  </div>
                  <div className="property-content">
                    <Link to={`/pgdetails/${pg?.id}`}>
                      <h3>{pg?.name}</h3>
                    </Link>
                    <Row justify="space-between">
                      <Col span={8}>
                        <span className="amount">&#8377;{pg?.price}</span>
                      </Col>
                      <Col span={16} className="rating">
                        <Rate allowHalf disabled value={pg?.averageRating} />
                      </Col>
                    </Row>
                  </div>
                  <div className="property-footer">
                    <ul>
                      <li>
                        <img src={location} alt="district" />
                        <span>{pg?.district}</span>
                      </li>
                      <li>
                        <img src={number} alt="Available Rooms" />
                        <span>{pg?.noofrooms}</span>
                      </li>
                      <li>
                        <img src={ac} alt="Room Type" />
                        <span>{pg?.roomtype}</span>
                      </li>

                      <div style={{ float: "right " }}></div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}

export default PGCard;
