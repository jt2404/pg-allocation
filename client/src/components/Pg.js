import React from 'react'
import '../index.css'

const Pg = (props) => {
    console.log(props);
  return (
    <>
    {
        Object.keys(props.pg).length > 0 ?
        <div>

        <div className="row bs ">
                <div className="col-md-4">
        </div>
        {
            props.pg.data.map((val,idx) => {
                return(
                    <>
                    
      <div className="cols-md-7">
      <h1>{val.name}</h1>
        <b>
        <p >city: {val.city}</p>
        <p >district: {val.district}</p>
        <p >no of rooms: {val.noofrooms}</p>
        <p >roomtype: {val.roomtype}</p>
        <p >price: {val.price}</p>
        <p >availableroom: {val.availableroom}</p>
        {/* <p >Image : {val.images[0]}</p>  */}

        <img src={val.images[0]} alt="ughg" height="120px" />
        {/* <p >price: {props.pg.price}</p> */}</b>
        <div style={{float:'right'}}>
        <button className="btn btn-primary">view Details</button>
        </div>
      </div>
                    </>
                )
            })
        }
      </div>
    </div> : <div></div>

    }
    </>
  )
  }
  export default Pg;