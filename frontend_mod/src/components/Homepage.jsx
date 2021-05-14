import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landing_2 from "../images/landing_2.jpg";
function Homepage(props) {
  const [btnclass, setBtnclass] = useState();

  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: "15%" }}>
        <h2 class="card-title">BlogPost</h2>
        <h3 class="card-text">
         A website to tell your own story
        </h3>
      </div>
      <div className="row">

        <div className="text-center">
          <Link to="/blogs">
            {" "}
            <button type="button" className="btn btn-homepage m-5">
              Get Started
            </button>
          </Link>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="text-center my-3">
          <h4>Sign Up to write your own story...</h4>
          <Link to="/signup">
            {" "}
            <button type="button" className="btn btn-homepage m-1">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

//  backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
