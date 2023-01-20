import React from 'react'

const Pg = (props) => {
  return (
{object.keys(props.pg).length > 0 ?
<div>
        {/* <div className="row row-cols-1 row-cols-md-2 g-4 "> */}

        <div className="row bs ">
  <div className="col-md-4">
    {/* <div class="card"> */}
      {/* <img src={""} className='smallimg'/> */}
      </div>
      <div className="cols-md-7">
      <h1>{props.pg.name}</h1>
        <b><p >address: {props.pg.address}</p>
        <p >city: {props.pg.city}</p>
        <p >district: {props.pg.district}</p>
        <p >no of rooms: {props.pg.noofrooms}</p>
        <p >roomtype: {props.pg.roomtype}</p>
        <p >price: {props.pg.price}</p>
        <p >availableroom: {props.pg.availableroom}</p>
        {/* <p >price: {props.pg.price}</p> */}</b>
        <div style={{float:'right'}}>
        <button className="btn btn-primary">view Details</button>
        </div>
      </div>
      </div>
    </div> : <></>
}
  )
  }
  export default Pg;