import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import CodebaseDataBox from './CodebaseDataBox';
import WPEngineDataBox from './WPEngineDataBox';
import CloudflareDataBox from './CloudflareDataBox';

class SiteDataPanel extends Component {
  constructor(props) {
    super(props);


  }

  handleClick = () => {
    this.className = 'open'; 
  }

  render() {
    const siteData = this.props.siteData;
    const codebaseData = this.props.codebaseData;

    return (
      <Collapsible
        trigger={<div>
                    <h2>{siteData.name}</h2>
                    <div className="plus-sign">+</div>
                  </div>}
        onClick={this.handleClick}
        key={siteData.id}          
        >
        <div className="flex-row">
          <CodebaseDataBox />
          <WPEngineDataBox />
          <CloudflareDataBox siteData={siteData}/>
        </div>
      </Collapsible>
    );
  }
}

export default SiteDataPanel;