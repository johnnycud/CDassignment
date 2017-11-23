import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import FansApp from './App';

var fans = [
    {
        "name": "Peter Byrne",
        "fan_name": "Spock",
        "phone_number": "058-43210"
    },

    {
        "name": "Kenny Kilagrew",
        "fan_name": "Bones",
        "phone_number": "01-678549"
    },

    {
        "name": "Kenny Murphy",
        "fan_name": "Scotty",
        "phone_number": "021-76895"
    },

    {
        "name": "Conor O Sullivan",
        "fan_name": "Kirk",
        "phone_number": "076-33456"
    }
];

ReactDOM.render(
    <FansApp fans={fans} />,
    document.getElementById('root')
);
