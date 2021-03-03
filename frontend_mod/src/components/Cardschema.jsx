import React from 'react';
import Blogvalidator from '../services/Blogvalidator';
import Fullblog from './Fullblog';
import ImageArray from './ImagesData';
function Cardschema(props) {
  return (
    
    <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6">
      <div className="card m-3 shadow-lg">
        <img src={ImageArray[Math.floor(Math.random()*9)]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4 className="card-title text-bold ">{props.title}</h4>
          <button className="btn btn-dark m-1">Read Blog</button>
          <h5 className="text-right">-{props.author}</h5>
          
        </div>
      </div>
    </div>

  );
}

export default Cardschema;