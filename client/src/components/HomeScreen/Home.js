import React,{useState, useEffect} from 'react'
import axios from "axios";
import Pg from "../Pg";
const Homescreen = () => {
const[pgname, setpgName]=useState("")
const[loading, setloading]=useState()
const[error, seterror]=useState()
const [pg,setPg] = useState({});
    const fetchData = async () => {
        
    try {
      setloading(true)

    //   const res= await fetch("/getpg",{
    //     method: "POST",
    //     headers:{
    //         "Content-Type":"Application/json"
    //     },
    //     body: JSON.stringify({pgname:"Radhe Krishna PG"})
    //   })
    const pgdata = await axios.post('/getpg',{
        pgname : "Radhe Krishna PG",
    })
    setPg(pgdata);
    console.log(pgdata);
    //   const data = await res.json();
    //   if(!data || res.status === 400){
    //     console.log("Not Found");
    //   }else{
    //       setPg(data);
    //       console.log(data);
    //   }
      

      setloading(false)
    } catch (error) {
      seterror(true)
      console.log(error)
      setloading(false)
    }
  }

  useEffect(() => {
    console.log("rkjfhg");
    fetchData();
  },[]);

  return ( 
//     <div className='container'>
//         <div className="row justify-content-center mt-5">
//         {loading ? (
//           <h1>Loading....</h1>
//           ) : error ? (<h1>Error... </h1>
//             ) : (
//               pg.map((pg)=>{
//       return <div className="col-md-9 mt-2">
//               <Pg pg={pg}/>
//               </div>;
//     })
//     )}
        
//          </div>
//     </div>
<>
{
    pg ? 
    <Pg pg={pg}/> : <h1>Not Found</h1>
}


</>
  ); 
  }
export default Homescreen
