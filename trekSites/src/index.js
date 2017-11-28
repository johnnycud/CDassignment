import React from 'react';
import ReactDOM from 'react-dom';
import SiteApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PhoneDetail from './phoneDetail';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Site List </h1>
                {this.props.children}
            </div>
        )
    }
};

ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={App}>
            <IndexRoute component={SiteApp} />
            <Route path="sites/:id" component={SiteDetail} />
        </Route>
    </Router>
    ,
    document.getElementById('root')
);