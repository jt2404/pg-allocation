import React, { Fragment } from "react";
import "./index.css";
import kr1 from "../../assests/images/kr1.jpg";
import location from "../../assests/images/location.png"
import number from "../../assests/images/number.png"
import ac from "../../assests/images/ac.png"

function PGCard({ pgs }) {
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
                    <div className="property-tag">For Sale</div>
                    <img src={kr1} alt="Palace" />
                  </div>
                  <div className="property-content">
                    <h3>{pg?.name}</h3>
                    <div className="mark">
                      <i class="fa-solid fa-location-dot"></i>
                      <span>Popular Properties</span>
                    </div>
                    <span className="amount">&#8377;{pg?.price}</span>
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="more-property">
          <a className="property-btn" href="/">
            More Properties
          </a>
        </div>
      </section>
    </Fragment>
  );
}

export default PGCard;
