import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landing_2 from "../images/landing_2.jpg";
function Homepage(props) {
  const [btnclass, setBtnclass] = useState();

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: "15%" }}>
        <h2 className="card-title" style={{ marginBottom: "2%" }}>
          BlogPost
        </h2>
        <h3 className="card-text">Welcome to the BlogPost family</h3>
      </div>
      <div className="row">
        <div className="text-center">
          <Link to="/blogs">
            {" "}
            <button type="button" className="btn btn-homepage m-3">
              Get Started
            </button>
          </Link>
          <hr />
        </div>
      </div>
      <div className="flex-row m-3">
      <div class="progress blue">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">90%</div>
            </div>
        
           
        <h3 className="text-center my-4">
        Take Your Writing to the Max
        </h3>
      </div>
    
      {/* <div className="row">
        <div className="text-center my-3">
          <h4>Sign Up to write your own blogs...</h4>
          <Link to="/signup">
            {" "}
            <button type="button" className="btn btn-homepage m-1">
              Register
            </button>
          </Link>
        </div>
      </div> */}
    </div>
  );
}

export default Homepage;

//  backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
