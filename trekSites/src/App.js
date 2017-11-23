import React from 'react';
import './App.css'

class SelectSite extends React.Component {
  render() {
    return (
      <div className="col-md-10">
        <input type="text" placeholder="Search" />
        Sort by:
            <select>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </div>
    );
  }
}

class SiteItem extends React.Component {
  render() {
    let url = process.env.PUBLIC_URL + '/siteSpecs/' + this.props.site.imageUrl;
    return (
      <li className="thumbnail site-listing">
        <a href={'/sites/' + this.props.site.id} className="thumb">
          <img src={url}
            alt={this.props.site.name} />
        </a>
        <a href={'/sites/' + this.props.site.id}> {this.props.site.name}</a>
        <p>{this.props.site.snippet}</p>
      </li>
    );
  }
}
    
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
  render() {
    return (
      <div className="view-container">
        <div className="view-frame">
          <div className="container-fluid">
            <div className="row">
              <SelectSite />
              <SiteList sites={this.props.sites}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteApp;