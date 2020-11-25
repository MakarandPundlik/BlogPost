import React from 'react';
import spin from './spin.gif';

const Loading = () =>{
    return(
        <img src={spin} alt="Loading" className="spin"/>
    )
}

export default Loading;