import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageArray from './ImagesData';
function Fullblog(props) {
    //Math.floor(Math.random()*ImageArray.length)
    return (
        <div className="m-3">
            <img src={ImageArray[1]} className="img-fluid" alt="blog image"></img>
        </div>
    );
}

export default Fullblog;