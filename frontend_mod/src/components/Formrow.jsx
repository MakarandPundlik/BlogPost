import React from 'react';

function Formrow(props) {
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <th scope="row">{props.firstname}</th>
            <th scope="row">{props.lastname}</th>
        </tr>
    );
}

export default Formrow;