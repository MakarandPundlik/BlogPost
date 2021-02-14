import React from 'react';
import Formrow from './Formrow';

function Homepage(props) {
    const dark = "table-dark";
    const light = "table-light";
    const users = [
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        },
        {
            
            firstname: 'testname',
            lastname: 'testname'
        }

    ];
    
    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            <table class="table text-center">
                <caption className="text-center"><h3>List of Users</h3></caption>
                <thead class={light}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        users.map((user,index) => {
                            return (
                               <Formrow 
                               key={index}
                                index={index}
                                firstname={user.firstname}
                                lastname={user.lastname}
                               />
                            )
                            index++;
                        })
                    }

                  
                </tbody>
            </table>
        </div>
    );
}

export default Homepage;