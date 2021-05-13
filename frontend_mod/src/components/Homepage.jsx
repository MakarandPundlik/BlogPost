import React, { useEffect, useState } from "react";
import landing_2 from "../images/landing_2.jpg";
function Homepage(props) {
 
  const [btnclass,setBtnclass] = useState()
  useEffect(async()=>{
    await setBtnclass(localStorage.getItem("dark").toString()?"btn btn-homepage-dark":"btn btn-homepage-light");
  },[btnclass,localStorage.getItem("dark")])
  return (
    <div
      className="container-fluid"
      style={{ background: "#00a2e2", height: "100vh" }}
    >
      <div className="row">
        <div className="col-lg-6 col-md-6 col-xl-6 text-left mx-5" style={{marginTop:"20%"}}>
          
        <button type="button" className={btnclass}>Get Started</button>
        </div>
      </div>
      {/* <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div
            className="wave waveTop"
            style={{
              backgroundImage:
                "url(" +
                "http://front-end-noobs.com/jecko/img/wave-top.png" +
                ")",
            }}
          ></div>
        </div>

        <div className="waveWrapperInner bgMiddle">
          <div
            className="wave waveMiddle"
            style={{
              backgroundImage:
                "url(" +
                "http://front-end-noobs.com/jecko/img/wave-mid.png" +
                ")",
            }}
          ></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div
            className="wave waveBottom"
            style={{
              backgroundImage:
                "url(" +
                "http://front-end-noobs.com/jecko/img/wave-bot.png" +
                ")",
            }}
          ></div>
        </div>
      </div> */}
    </div>
  );
}

export default Homepage;

//  backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
