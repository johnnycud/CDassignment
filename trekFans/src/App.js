import React from 'react';
import api from './test/stubAPI' 
class FanForm extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <input type="text" className="form-control" />
        </td>
        <td>
          <input type="text" className="form-control" />
        </td>
        <td>
          <input type="text" className="form-control" />
        </td>
        <td>
          <input type="button" className="btn btn-primary" value="Add" />
        </td>
      </tr>
    )
  }
}

class Fan extends React.Component {
  render() {
    return (
      <tr >
        <td>
          {this.props.fan.name}
        </td>
        <td>
          {this.props.fan.fan_name}
        </td>
        <td>
          {this.props.fan.phone_number}
        </td>
        <td>
          <input type="button" className="btn btn-primary" value="Edit" />
        </td>
        <td>
          <input type="button" className="btn btn-danger" value="Delete" />
        </td>
      </tr>

    );
  }
}

class FanList extends React.Component {
  render() {
    var fanRows = this.props.fans.map(
      function (c) {
        return <Fan key={c.phone_number} fan={c} />
      });
return (
  <tbody >
        {fanRows}
        <FanForm fans={this.props.fans}/>
      </tbody>
    );
  }
}

class FansTable extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Fan Name</th>
            <th>Phone Number</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <FanList fans={this.props.fans}/>
      </table>
    );
  }
}

class FansApp extends React.Component {
  render() {
    var fans = api.getAll();
    return (
      <div>
        <h1>Fan List.</h1>
        <FansTable fans={fans} />
      </div>
    );
  }
}

export default FansApp;
