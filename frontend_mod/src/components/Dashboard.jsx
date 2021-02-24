import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../images/Loading.gif';
const API_URL = 'http://localhost:2020';
function Dashboard(props) {
    let [users, setUsers] = useState(null);
    let [redirect, setRedirect] = useState(false);
    let [loading, setLoading] = useState(true);
    useEffect(async () => {
        if (new Date().getTime() - localStorage.getItem("setuptime") >= 60 * 60 * 1000)
            localStorage.clear();

        if (localStorage.getItem("accesstoken") == null)
            setRedirect(true);


        await axios.post(`${API_URL}/api/authenticate`, {
            accesstoken: localStorage.getItem("accesstoken")
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((res) => {
                if (!res.data.isAuthenticated) {
                    localStorage.removeItem("accesstoken");
                    localStorage.removeItem("username");
                }
            })
            .catch((err) => {
                localStorage.removeItem("accesstoken");
                console.log(err)
            });

    }, [redirect, loading]);

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();

        props.history.push("/login");
    }
    return (
        // loading ? ( <img src={Loading}/>) : (
        redirect ? (<Redirect to="/login"></Redirect>) : (
            <div>

                <button type="button" className="btn btn-dark m-3 " onClick={(e) => handleClick(e)}>Logout</button>

                <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card m-3">
      <img src={Loading} class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Read More
</button>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        
      </div>
      <div class="modal-body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus metus, eleifend at magna ac, vestibulum tincidunt mi. Donec urna sapien, rhoncus semper mattis eget, lacinia eu mauris. Integer feugiat semper laoreet. Fusce consequat leo quis tellus vulputate, consequat consectetur ligula tincidunt. Fusce efficitur nisl est, non auctor odio pellentesque id. Donec facilisis vitae est sed feugiat. In molestie imperdiet efficitur. In hac habitasse platea dictumst. Fusce malesuada aliquet mauris, eget cursus sapien vestibulum a. Maecenas in neque ut nisi consequat tincidunt.

Praesent blandit placerat magna. Donec sit amet ipsum nunc. Proin finibus augue nec urna volutpat, et laoreet mi consequat. Curabitur tincidunt euismod tortor a porttitor. Donec suscipit sit amet tortor at sodales. Fusce eu nisi eu sem finibus euismod nec sit amet libero. Aliquam erat volutpat. Sed orci tortor, eleifend ut nunc vel, facilisis maximus sapien. Praesent in lobortis nunc, et auctor nisi. Nunc ac justo sit amet tortor iaculis semper. Etiam luctus lobortis ultrices.

Aliquam urna metus, fringilla a imperdiet ac, posuere non ante. Fusce commodo enim non augue maximus suscipit. Proin interdum congue mauris, sit amet faucibus tortor scelerisque sit amet. Ut tincidunt, neque eu volutpat euismod, sem dolor tincidunt velit, sit amet elementum libero ante id quam. Pellentesque eget diam volutpat, commodo sapien sed, ultricies purus. Proin vitae viverra est. Phasellus ultrices facilisis nunc, sit amet pharetra enim maximus a. Fusce maximus vitae massa at suscipit. Ut vehicula metus tortor, at ultrices tortor mollis id. Morbi in nibh mauris.

Nullam vulputate sit amet lorem id porttitor. Ut tristique sapien vel massa efficitur convallis. Vestibulum vitae neque ac lacus malesuada blandit vel sit amet nisl. Aliquam aliquet iaculis sodales. Proin massa sapien, maximus nec sapien vulputate, dictum hendrerit mauris. Etiam egestas venenatis lectus, in vehicula nunc pharetra sed. Nunc sed diam pulvinar, venenatis turpis et, rutrum mauris. Fusce gravida et purus condimentum rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non efficitur nibh, faucibus pretium ex. Mauris ac mi enim. Donec laoreet tempus mi id sollicitudin.

Duis imperdiet non lectus nec interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec iaculis et sapien pharetra luctus. Pellentesque fringilla, magna bibendum rhoncus consequat, lorem ex dignissim felis, non accumsan velit mi id tellus. Fusce a augue at nisl aliquam varius. Integ
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
  
</div>
            </div>
        )
    )
    //)
}

export default Dashboard;