import React from 'react';
import api from './test/stubAPI'
import buttons from './config/buttonsConfig';

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
  state = {
    status: '',
    name: this.props.fans.name,
    fan_name: this.props.fans.fan_name,
    phone_number: this.props.fans.phone_number
  };
  handleEdit = () => this.setState({ status: 'edit' });

  handleAdd = () => this.setState({ status: 'add' });

  handleSave = (e) => {
    e.preventDefault();
    let name = this.state.name.trim();
    let fan_name = this.state.fan_name.trim();
    let phone_number = this.state.phone_number.trim();
    if (!name || !fan_name || !phone_number) {
      return;
    }
    this.setState({ status: '' })
    this.props.updateHandler(this.props.contact.phone_number,
      name, fan_name, phone_number);
  };

  handleCancel = function () {
    this.setState({
      status: '',
      name: this.props.fan.name,
      address: this.props.fan.fan_name,
      phone_number: this.props.fan.phone_number
    });
  }.bind(this);

  handleNameChange = (e) => this.setState({ name: e.target.value });

  handleFanNameChange = (e) => this.setState({ fan_name: e.target.value });

  handlePhoneNumChange = (e) => this.setState({ phone_number: e.target.value });
  render() {
    let activeButtons = buttons.normal;
    let leftButtonHandler = this.handleEdit;
    let rightButtonHandler = null;
    let fields = [
      <td key={'name'} >{this.state.name}</td>,
      <td key={'fan_name'}>{this.state.fan_name}</td>,
      <td key={'phone_number'}>{this.state.phone_number}</td>
    ];
    if (this.state.status === 'edit') {
      activeButtons = buttons.edit;
      leftButtonHandler = this.handleSave;
      rightButtonHandler = this.handleCancel;
      fields = [
        <td key={'name'}><input type="text" className="form-control"
          value={this.state.name}
          onChange={this.handleNameChange} /> </td>,
        <td key={'fan_name'}><input type="text" className="form-control"
          value={this.state.fan_name}
          onChange={this.handleFanNameChange} /> </td>,
        <td key={'phone_number'}><input type="text" className="form-control"
          value={this.state.phone_number}
          onChange={this.handlePhoneNumChange} /> </td>,
      ];
      if (this.state.status === 'add') {
        activeButtons = buttons.normal;
        leftButtonHandler = this.handleConfirm;
        rightButtonHandler = this.handleUndo;
        fields = [
          <td key={'name'}><input type="text" className="form-control"
            value={this.state.name}
            onChange={this.handleNameChange} /> </td>,
          <td key={'fan_name'}><input type="text" className="form-control"
            value={this.state.fan_name}
            onChange={this.handleFanNameChange} /> </td>,
          <td key={'phone_number'}><input type="text" className="form-control"
            value={this.state.phone_number}
            onChange={this.handlePhoneNumChange} /> </td>,
        ];

        return (
          <tr >
            {fields}
            <td>
              <input type="button" className={'btn ' + activeButtons.leftButtonColor}
                value={activeButtons.leftButtonVal}
                onClick={leftButtonHandler} />
            </td>
            <td>
              <input type="button" className={'btn ' + activeButtons.rightButtonColor}
                value={activeButtons.rightButtonVal}
                onClick={rightButtonHandler} />
            </td>
          </tr>
        );
      }
    }
  }
};


class FanList extends React.Component {
  render() {
    let fanRows = this.props.fans.map((c) => {
      return <Fan key={c.phone_number} fan={c}
        updateHandler={this.props.updateHandler} />;
    });
    return (
      <tbody >
        {fanRows}
        <FanForm fans={this.props.fans} />
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
        <FanList fans={this.props.fans}
          updateHandler={this.props.updateHandler} />
      </table>
    );
  }
}
class FansAPP extends React.Component {
    var FansApp = React.createClass({
    componentDidMount: function () {
      var p = api.getAll();
      p.then(response => {
        localStorage.clear();
        localStorage.setItem('fans', JSON.stringify(response));
        this.setState({});
      }
    }
  });

  updateContact: function(key, n, a, p) {
    api.update(1234, n, a, p)
      .then(response => {
        return api.getAll()
    })
      .then(response => {
        localStorage.clear();
        localStorage.setItem('fans', JSON.stringify(response));
        this.setState({});
      })
      .catch(error => { console.log(`Update failed for ${error}`) });
    }

  deleteFan: function(k) {
    api.delete(k)
      .then(response => {
        return api.getAll()
      })
      .then(response => {
        localStorage.clear();
        localStorage.setItem('fans', JSON.stringify(response));
        this.setState({});
      });            
  }
  render: function() {
    var fans = localStorage.getItem('fans');
    JSON.parse(localStorage.getItem('fans')), [];
  return (
    <div>
      <h1>Fan List.</h1>
      <FansTable fans={fans}
        updateHandler={this.updateFan} />
    </div>
    );
  }
}

export default FansApp;
