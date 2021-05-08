import React from 'react';

function ProfileInfo({name,age,about}) {
    return (
        <div className="card text-center mx-5" style={{maxWidth:"35rem"}}>
  <div className="card-header">
    Personal Info
  </div>
  <div className="card-body">
    <h5 className="card-title">{name.toLocaleUpperCase()}</h5>
    <p className="card-text">{about}</p>
    <a href="/" className="btn btn-dark">Go somewhere</a>
  </div>
  <div className="card-footer text-muted d-flex justify-content-center">
  <ion-icon name="timer-outline" size="large"></ion-icon>
   <p className="m-1">Recent activity : 2 days ago</p>
  </div>
</div>
    );
}

export default ProfileInfo;