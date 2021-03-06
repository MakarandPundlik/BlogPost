import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageArray from './ImagesData';
import fullblog from '../images/fullblog.jpg';
function Fullblog(props) {
    const location = useLocation();
   
    return (
       
    <div className="card mx-auto my-5" style={{maxWidth:'1000px'}}>
  <img src={fullblog} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h4 className="card-title">{location.state.title}</h4><hr/>
    <h5 className="card-text">{location.state.data}</h5>
   
  </div>
  <div className="card-footer">
   <h5 className='text-right'>-{location.state.author}</h5>
   {/* <h5 className="text-left">Comments - <hr/>
    Add a comment <input type="text" id="newcomment" placeholder="Comment here..."></input>
   </h5>
   <hr/>
   <ul className="list-group list-group-flush">
    <li className="list-group-item text-left">An item <p className="text-right">-username</p></li>
  </ul> */}
  </div>
</div>
    );
}

export default Fullblog;