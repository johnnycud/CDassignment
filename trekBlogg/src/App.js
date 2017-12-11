import React from 'react';
import _ from 'lodash';
import api from './test/stubAPI';
import buttons from './config/buttonsConfig';

class Form extends React.Component {
  state = { title: '', link: '' };

  render() {
    return (
      <form style={{ marginTop: '30px' }}>
        <h3>Add a new blogg</h3>
        <div className="form-group">
          <input type="text"
            className="form-control" placeholder="Title"
            value={this.state.title} ></input>
        </div>
        <div className="form-group">
          <input type="text"
            className="form-control" placeholder="Link"
            value={this.state.link} ></input>
        </div>
        <button type="submit" className="btn btn-primary" >Blogg</button>
      </form>
    );
  }
};

class Blogg extends React.Component {
  state = {
    status: '',
    title: this.props.bloggs.title,
    link: this.props.bloggs.link
  };
  handleBlogg = () => this.setState({ status: 'blogg' });


  handleVote = () => this.props.upvoteHandler(this.props.blogg.id);

  handleSave = (e) => {
    e.preventDefault();
    let title = this.state.title.trim();
    let link = this.state.link.trim();
    if (!title || !link ) {
      return;
    }
    this.setState({ status: '' })
    this.props.updateHandler(this.props.blogg.id,
      title, link);
  };

  handleCancel = function () {
    this.setState({
      status: '',
      name: this.props.blogg.title,
      address: this.props.blogg.link
    });
  }.bind(this);

  handleTitleChange = (e) => this.setState({ title: e.target.value });

  handleLinkChange = (e) => this.setState({ link: e.target.value });

  render() {
    let activeButtons = buttons.normal;
    let leftButtonHandler = this.handleEdit;
    let lineStyle = {
      fontSize: '20px', marginLeft: '10px'
    };
    let cursor = { cursor: 'pointer' };
    let line;
    if (this.props.blogg.link) {
      line = <a href={this.props.blogg.link} >
        {this.props.blogg.title} </a>;
    } else {
      line = <span>{this.props.blogg.title} </span>;
    }
    let fields = [
      <td key={'title'} >{this.state.title}</td>,
      <td key={'link'}>{this.state.link}</td>
    ];

    if (this.state.status === 'blogg') {
      activeButtons = buttons.normal;
      leftButtonHandler = this.handleConfirm;
     
      fields = [
        <td key={'title'}><input type="text" className="form-control"
          value={this.state.title}
          onChange={this.handleTitleChange} /> </td>,
        <td key={'link'}><input type="text" className="form-control"
          value={this.state.link}
          onChange={this.handleFanNameChange} /> </td>,
      ];
    return (
      <div >
        <span className="glyphicon glyphicon-thumbs-up"
          style={cursor}
          onClick={this.handleVote} ></span>
        {this.props.blogg.upvotes}
        <span style={lineStyle} >{line}<span>
          <a href={'#/bloggs/' + this.props.blogg.id}>Comments</a>
        </span>
        </span>
        {fields}
        <td>
          <input type="button" className={'btn ' + activeButtons.leftButtonColor}
            value={activeButtons.leftButtonVal}
            onClick={leftButtonHandler} />
        </td>
      </div>
      );
    }
  }
}

class BloggList extends React.Component {
  render() {
    let items = this.props.bloggs.map((blogg, index) => {
      return <Blogg key={index}
        blogg={blogg}
        upvoteHandler={this.props.upvoteHandler} />;
    })
    let bloggRows = this.props.bloggs.map((c) => {
      return <Blogg key={c.index} blogg={c}
        updateHandler={this.props.updateHandler} />;
    });
    return (
      <div>
        {items}{bloggRows}
        <Form bloggs={this.props.bloggs} />
      </div>
    );
  } 
}
class BloggApp extends React.Component {
  incrementUpvote = (id) => {
    api.upvote(id);
    this.setState({});
  };
  updateContact = (key, n, a ) => {
    api.update(key, n, a );
    this.setState({});
  };
  render() {
    let bloggs = _.sortBy(api.getAll(), function (blogg) {
      return - blogg.upvotes;
    }
    );
    return (
      <div>
        <h1>Blogg List.</h1>
        <BloggList bloggs={bloggs}
          updateHandler={this.updateFan} />
      </div>
    );
  }
}

export default BloggApp;

