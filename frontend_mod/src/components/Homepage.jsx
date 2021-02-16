import React, { useEffect, useState } from 'react';
import Formrow from './Formrow';
import getUsers from '../services/Users';
function Homepage(props) {
    // const darkTable = "table-dark ";
    // const lightTable = "table-light ";
    // const dark = "text-white"
    // const light = "text-dark"
    const [users,setUsers]=useState(null);
    const [flag,setFlag] = useState(false);
    useEffect(async() => {
        await getUsers().then((res)=>{
            setUsers(res);
        });
        if(users)
        setFlag(true);
        console.log(users);
    }, []);
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
                           flag &&  users.map((user, index) => {
                                return (
                                    <Formrow
                                        key={index}
                                        index={index + 1}
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
/*
users && 
Kaustubh Odak5:25 PM
const getUsers = () => axios.get('...')
useEffect(() => {
    getUsers().then(res => setUsers(res))
})*/ 