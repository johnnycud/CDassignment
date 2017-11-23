import React from 'react';
import ReactDOM from 'react-dom';
import SiteApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Sites from './Data';

ReactDOM.render(
    <SiteApp sites={Sites} />,
    document.getElementById('root')
);