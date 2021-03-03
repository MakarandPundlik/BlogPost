import React from 'react';
import ImageArray from './ImagesData';
function Cardschema({blog}) {
  return (
    
    <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6">
      <div className="card m-3 shadow-lg">
        <img src={ImageArray[Math.floor(Math.random()*9)]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-bold ">{blog.title}</h5>
          <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Read More
          </button>
          <h5 className="text-secondary text-right">-{blog.author}</h5>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-secondary" id="staticBackdropLabel">{blog.title} </h5>
                  <button type="button" className="btn btn-danger rounded-pill " data-bs-dismiss="modal">Close</button>
                </div>
                <div className="modal-body ">
                {blog.data}
                </div>
                <div className="modal-footer">
                  
                 <h4 className="text-secondary text-left">-{blog.author}</h4>
                 <hr/>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Cardschema;