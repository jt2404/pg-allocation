<<<<<<< HEAD
import React, { Fragment ,useState} from "react";
=======
import React, { Fragment, useState } from "react";
>>>>>>> d1284de1c78336efc40a4f60cd800856f5109ac2
import "./index.css";
 import {Button,Modal,Carousel} from 'react-bootstrap';
import kr1 from "../../assests/images/kr1.jpg";
<<<<<<< HEAD

// import kr2 from "../../assests/images/kr2.jpg";
import location from "../../assests/images/location.png"
import number from "../../assests/images/number.png"
import ac from "../../assests/images/ac.png"
// import {Link} from 'react-router-dom'
function PGCard({ pgs }) {

=======
import { Button, Modal, Carousel } from "react-bootstrap";
import location from "../../assests/images/location.png";
import number from "../../assests/images/number.png";
import ac from "../../assests/images/ac.png";
import { Link } from "react-router-dom";

function PGCard({ pgs }) {
>>>>>>> d1284de1c78336efc40a4f60cd800856f5109ac2
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <section className="property">
        <div className="center">
          <h3>Popular PG</h3>
        </div>
        <div className="row">
          {pgs?.map((pg) => (
            <Link to={`/pgdetails/${pg?._id}`}>
              <div className="column" id={pg?._id}>
                <div className="single-property">
                  <div className="card">
                    <div className="property-thumb">
                      {/* <div className="property-tag">For Sale</div> */}
                      <img src={pg.images[0] || kr1} alt="Palace" />
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

                        <div style={{ float: "right " }}>
                          {/* <Link> */}
                          {/* <button className="btn btn-primary m-2">
                            Book Now
                          </button> */}
                          {/* </Link> */}
                        </div>
                        {/* <div style={{ float: "right" }}>
                          <button
                            className="btn btn-primary"
                            onClick={handleShow}
                          >
                            view details
                          </button>
                        </div> */}
                      </ul>
                    </div>
<<<<<<< HEAD
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
                      <div style={{ float:"right "}}>
                       {/* <Link> */}
                        <button className="btn btn-primary m-2">Book Now</button>
                        {/* </Link> */}
                        </div> 
                         <div style={{ float:"right"}}>
                        <button className="btn btn-primary"onClick={handleShow}>view details</button>
                        </div> 
                        
                    </ul>
                  </div>
                </div>
              </div>
            </div>
      
          ))}

          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pgs.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Carousel fade>
         {/* {pgs.images.map(url=>
=======
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{pgs.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel fade> */}
                {/* {pgs.images.map(url=>
>>>>>>> d1284de1c78336efc40a4f60cd800856f5109ac2
        return  <Carousel.Item>
        <img

          className="d-block w-100"
          src={url}
         
        />
      </Carousel.Item>
<<<<<<< HEAD
        )} */}        
        <Carousel.Item>
        <img
          className="d-block w-100"
          src="/static/media/kr1.1728cd57353aa767a8ec.jpg"
        
        />
        </Carousel.Item>
        <Carousel.Item>
        <img
          className="d-block w-100"
          src="/static/media/kr1.1728cd57353aa767a8ec.jpg"
        
        />
        </Carousel.Item>
        <Carousel.Item>
        <img
          className="d-block w-100"
          src="/static/media/kr1.1728cd57353aa767a8ec.jpg"
         
        />
        </Carousel.Item>
        
    </Carousel>
        <p> pgSchema.description </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </div>

=======
        )} */}
                {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/static/media/kr1.1728cd57353aa767a8ec.jpg"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/static/media/kr1.1728cd57353aa767a8ec.jpg"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/static/media/kr1.1728cd57353aa767a8ec.jpg"
                  />
                </Carousel.Item>
              </Carousel>
              <p> pgs.description </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
>>>>>>> d1284de1c78336efc40a4f60cd800856f5109ac2
        {/* <div className="more-property">
          <a className="property-btn" href="/">
            More Properties
          </a>
        </div> */}
      </section>
    </Fragment>
  );
}

export default PGCard;
