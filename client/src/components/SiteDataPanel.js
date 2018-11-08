import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import CodebaseDataBox from './CodebaseDataBox';
import WPEngineDataBox from './WPEngineDataBox';
import CloudflareDataBox from './CloudflareDataBox';

class SiteDataPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const siteName = this.props.siteName;
    const siteData = this.props.siteData;

    return (
      <Collapsible
        trigger={<div>
                    <h2>{siteName}</h2>
                    <div className="plus-sign">+</div>
                  </div>}
        key={siteData.id}          
        >
        <div className="flex-row">
          <CodebaseDataBox codebaseData={siteData.codebase} />
          <WPEngineDataBox installData={siteData.WPEngine} />
          <CloudflareDataBox zoneData={siteData.cloudflareZones}/>
        </div>
      </Collapsible>
    );
  }
}

export default SiteDataPanel;