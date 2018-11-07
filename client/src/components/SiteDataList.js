import React, { Component } from 'react';
import SiteDataPanel from './SiteDataPanel';

class SiteDataList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latestPost: null,
    }
  }

  render() {
    const siteList = this.props.zones;
    const filteredSiteList = siteList.filter((site) => site.name.includes(this.props.searchTerm));

    return (
      <div className="container">
        {filteredSiteList.map((filteredSite) => {
          return (
            <SiteDataPanel 
              siteData={filteredSite} 
              key={filteredSite.id} 
            />
          );
        })}
      </div>
    );
  }
}

export default SiteDataList;