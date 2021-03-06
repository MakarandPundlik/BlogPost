import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageArray from './ImagesData';
import fullblog from '../images/fullblog.jpg';
function Fullblog(props) {
    const location = useLocation();
    const [state,setState] = useState({
      title:location.state.title,
      data:location.state.data,
      author:location.state.author,
      isAuthenticated:location.state.isAuthenticated,
      id:props.id
    })

    //handle blog edits
    const handlEdit=()=>{
      console.log('edit blog');

    }
    //handle delete
    const handleDelete=()=>{
      console.log('blog has been deleted');
      console.log(state.id)
    }
    return (
       
    <div className="card mx-auto my-5" style={{maxWidth:'1000px'}}>
  <img src={fullblog} className="card-img-top" alt="..."/>
  <div className="card-body">
   {
     location.state.isAuthenticated &&
       <div className="text-right">
      <button className="btn btn-secondary mx-2" onClick={()=>handlEdit()}>Edit</button>
      <button className="btn btn-danger" onClick={()=>handleDelete()}>Delete</button>
      </div>
   }
    <h4 className="card-title">{state.title}</h4><hr/>
    <h5 className="card-text">{state.data}</h5>
   
  </div>
  <div className="card-footer">
   <h5 className='text-right'>-{state.author}</h5>
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