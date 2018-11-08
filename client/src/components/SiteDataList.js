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
    const siteList = Object.keys(this.props.allSiteData);
    const filteredSiteList = siteList.filter((siteName) => siteName.includes(this.props.searchTerm));

    return (
      <div className="container">

        {filteredSiteList.map((filteredSite, index) => {
          return (
            <SiteDataPanel
              siteName={filteredSite} 
              siteData={this.props.allSiteData[filteredSite]}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

export default SiteDataList;