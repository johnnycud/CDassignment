import React from 'react';
import './App.css';
import _ from 'lodash';
import Sites from './Data';
import { Link } from 'react-router';

class SelectSite extends React.Component {
  handleChange = (e, type, value) => {
    e.preventDefault();
    this.props.onUserInput(type, value);
  };

  handleTextChange = (e) => {
    this.handleChange(e, 'search', e.target.value);
  };

  handleSortChange = (e) => {
    this.handleChange(e, 'sort', e.target.value);
  };

  render: function(){
    let list = Sites.filter((p) => {
      return p.name.toLowerCase().search(
        this.state.search.toLowerCase()) !== -1;
    });
    let filteredList = _.sortBy(list, this.state.sort) ;
    return (
      <div className="col-md-10">
        <input type="text" placeholder="Search"
          value={this.props.filterText}
          onChange={this.handleTextChange} />
        Sort by:
                <select id="sort" value={this.props.order}
          onChange={this.handleSortChange} >
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </div>
    );
  }
}
class SiteItem extends React.Component {
  render() {
    return (
      <li className="thumbnail site-listing">
        <Link to={'/sites/' + this.props.site.id} className="thumb">
          <img src={"/siteSpecs/" + this.props.site.imageUrl}
            alt={this.props.site.name} /> </Link>
        <Link to={'/sites/' + this.props.site.id}> {this.props.site.name}</Link>
        <p>{this.props.site.snippet}</p>
      </li>
    );
  }
};
    
class SiteList extends React.Component {
  render() {
    var displayedSites = this.props.sites.map(function (site) {
      return <SiteItem key={site.id} site={site} />;
    });
    return (
      <div className="col-md-10">
        <ul className="sites">
          {displayedSites}
        </ul>
      </div>
    );
  }
}

class SiteApp extends React.Component {
  state = { search: '', sort: 'name' };

  handleChange = (type, value) => {
    if (type === 'search') {
      this.setState({ search: value });
    } else {
      this.setState({ sort: value });
    }
  };

  render() {
    let list = this.props.sites.filter((p) => {
      return p.name.toLowerCase().search(
        this.state.search.toLowerCase()) !== -1;
    });
    let filteredList = _.sortBy(list, this.state.sort);
    return (
      <div className="view-container">
        <div className="view-frame">
          <div className="container-fluid">
            <div className="row">
              <SelectSite onUserInput={this.handleChange}
                filterText={this.state.search}
                sort={this.state.sort} />
              <SiteList sites={filteredList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteApp;