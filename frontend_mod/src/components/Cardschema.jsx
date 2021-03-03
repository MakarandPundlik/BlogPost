import React from 'react';
import ImageArray from './ImagesData';
function Cardschema(props) {
  return (

    <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6">
      <div className="card m-3 shadow-lg">
        <img src={ImageArray[Math.floor(Math.random()*10)]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Read More
              </button>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Modal title </h5>

                </div>
                <div className="modal-body">
               
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus metus, eleifend at magna ac, vestibulum tincidunt mi. Donec urna sapien, rhoncus semper mattis eget, lacinia eu mauris. Integer feugiat semper laoreet. Fusce consequat leo quis tellus vulputate, consequat consectetur ligula tincidunt. Fusce efficitur nisl est, non auctor odio pellentesque id. Donec facilisis vitae est sed feugiat. In molestie imperdiet efficitur. In hac habitasse platea dictumst. Fusce malesuada aliquet mauris, eget cursus sapien vestibulum a. Maecenas in neque ut nisi consequat tincidunt.

                  Praesent blandit placerat magna. Donec sit amet ipsum nunc. Proin finibus augue nec urna volutpat, et laoreet mi consequat. Curabitur tincidunt euismod tortor a porttitor. Donec suscipit sit amet tortor at sodales. Fusce eu nisi eu sem finibus euismod nec sit amet libero. Aliquam erat volutpat. Sed orci tortor, eleifend ut nunc vel, facilisis maximus sapien. Praesent in lobortis nunc, et auctor nisi. Nunc ac justo sit amet tortor iaculis semper. Etiam luctus lobortis ultrices.

                  Aliquam urna metus, fringilla a imperdiet ac, posuere non ante. Fusce commodo enim non augue maximus suscipit. Proin interdum congue mauris, sit amet faucibus tortor scelerisque sit amet. Ut tincidunt, neque eu volutpat euismod, sem dolor tincidunt velit, sit amet elementum libero ante id quam. Pellentesque eget diam volutpat, commodo sapien sed, ultricies purus. Proin vitae viverra est. Phasellus ultrices facilisis nunc, sit amet pharetra enim maximus a. Fusce maximus vitae massa at suscipit. Ut vehicula metus tortor, at ultrices tortor mollis id. Morbi in nibh mauris.

                  Nullam vulputate sit amet lorem id porttitor. Ut tristique sapien vel massa efficitur convallis. Vestibulum vitae neque ac lacus malesuada blandit vel sit amet nisl. Aliquam aliquet iaculis sodales. Proin massa sapien, maximus nec sapien vulputate, dictum hendrerit mauris. Etiam egestas venenatis lectus, in vehicula nunc pharetra sed. Nunc sed diam pulvinar, venenatis turpis et, rutrum mauris. Fusce gravida et purus condimentum rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non efficitur nibh, faucibus pretium ex. Mauris ac mi enim. Donec laoreet tempus mi id sollicitudin.

                  Duis imperdiet non lectus nec interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec iaculis et sapien pharetra luctus. Pellentesque fringilla, magna bibendum rhoncus consequat, lorem ex dignissim felis, non accumsan velit mi id tellus. Fusce a augue at nisl aliquam varius. Integ
                   </div>
                <div className="modal-footer">
                  
                  
                  <button type="button" className="btn btn-danger rounded-pill " data-bs-dismiss="modal">Close</button>
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