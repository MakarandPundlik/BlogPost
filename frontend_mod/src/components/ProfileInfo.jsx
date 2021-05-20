import React from "react";

function ProfileInfo({ name, age, about,total,last_activity,gender }) {
  return (
    <div className="d-flex ">
      <div className="card text-left mx-5 bg-custom" style={{ maxWidth: "35rem",color:"#ffffff" }}>
        <h4 className="card-header">Personal Info</h4>
        <div className="card-body">
          <h4 className="card-title">Name :- {name.toLocaleUpperCase()}</h4>
          <h6 className="card-text">About :- {about===undefined?"Not Applicable":about}</h6>
          <h6 className="card-text">Age :- {age}</h6>
          <h6 className="card-text">Gender :- {gender}</h6>
        </div>
        
      </div>
      <div className="card text-left mx-5 bg-custom" style={{ maxWidth: "30rem",color:"#ffffff" }}>
        <h4 className="card-header">Statistics</h4>
        <div className="card-body">
          
          <h5 className="card-title">Total blogs written :-  {total}</h5>
          <h5 className="card-title">Total views :-  {total}</h5>
          <p className="card-text"></p>
        </div>
        <div className="card-footer d-flex">
          <ion-icon name="timer-outline" size="large"></ion-icon>
          <p className="m-1">Recent activity :- {last_activity}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
