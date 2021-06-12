import React from 'react';

function Tablerow(props) {
    return (
        <tr>
            <td span="row">{props.index+1}</td>
            <td>{props.firstname}</td>
             <td>{props.user.lastname}</td>
             <td>{props.user.email}</td>
        </tr>
    );
}

export default Tablerow;