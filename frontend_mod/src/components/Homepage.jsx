import React from 'react';
import Formrow from './Formrow';
import users from './Userdata';
function Homepage(props) {
    // const darkTable = "table-dark ";
    // const lightTable = "table-light ";
    // const dark = "text-white"
    // const light = "text-dark"
    return (
        <div>
            
            <div className="container">
            <table className="table table-stripped table-hover">
                <caption className="text-center"><h3>List of Users</h3></caption>
                <thead >
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Last Active</th>
                    </tr>
                </thead>
                <tbody >


                    {
                        users.map((user,index) => {
                            return (
                               <Formrow 
                               key={index}
                                index={index+1}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                lastactive={user.lastactive}
                               />
                            )
                            index++;
                        })
                    }

                  
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Homepage;