import React from 'react';

class Entry extends React.Component {
  render() {
    return (
      <form style={{ marginTop: '30px' }}>
        <h3>Add a new blogg</h3>

        <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Title"></input>
        </div>
        <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Link"></input>
        </div>
        <button type="submit" className="btn btn-primary">Blogg</button>
      </form>
    );
  }
}

class BloggItem extends React.Component {
  render() {
    var divStyle = {
      fontSize: '20px',
      marginLeft: '10px'
    };
    var cursor = { cursor: 'pointer' };
    var line;
    if (this.props.blogg.link) {
      line = <a href={this.props.blogg.link} >
        {this.props.blogg.title} </a>;
    } else {
      line = <span>{this.props.blogg.title} </span>;
    }
    return (
      <div >
        <span className="glyphicon glyphicon-thumbs-up"
          style={cursor} />
        {this.props.blogg.upvotes}
        <span style={divStyle} >{line}<span>
          <a href={'#/bloggs/' + this.props.blogg.id}>Comments</a>
        </span>
        </span>
      </div>
    );
  }
}

class BloggList extends React.Component {
  render() {
    var content = this.props.bloggs.map(function (blogg, index) {
      return <BloggItem key={index} blogg={blogg} />;
    });
    return (
      <div>
        {content}
      </div>
    );
  }
}

class BloggApp extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="page-header">
              <h1>Blogg News</h1>
              <BloggList bloggs={this.props.bloggs}/>  
              <Entry />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BloggApp;

