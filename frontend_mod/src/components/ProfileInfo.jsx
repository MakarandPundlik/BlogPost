import React from "react";

function ProfileInfo({ name, age, about,total,last_activity }) {
  return (
    <div className="d-flex ">
      <div className="card text-center mx-5 bg-custom" style={{ maxWidth: "35rem",color:"#ffffff" }}>
        <div className="card-header">Personal Info</div>
        <div className="card-body">
          <h5 className="card-title">{name.toLocaleUpperCase()}</h5>
          <p className="card-text">{about}</p>
        </div>
        
      </div>
      <div className="card text-center mx-5 bg-custom" style={{ maxWidth: "30rem",color:"#ffffff" }}>
        <div className="card-header">Statistics</div>
        <div className="card-body">
          
          <h5 className="card-title">Total blogs written : {total}</h5>
          <h5 className="card-title">Total views : {total}</h5>
          <p className="card-text"></p>
        </div>
        <div className="card-footer  d-flex justify-content-center">
          <ion-icon name="timer-outline" size="large"></ion-icon>
          <p className="m-1">Recent activity : {last_activity}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
