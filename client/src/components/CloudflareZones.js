import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class CloudflareZones extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latestPost: null,
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.zones.map((result) => {
          return (
            // Render a new Site component inside of each Collapsible component, passing in props.
            // Inside of the Site component, call APIs specific to that site - for example, build a request
            // to WP json to get latest post data. 
            <Collapsible 
              trigger={<div>
                          <h2>{result.name}</h2>
                          <div className="plus-sign">+</div>
                        </div>}
              key={result.id}          
            >
              <div className="flex-row">
                <div className="data-box">
                  <img className="icon" src="images/dr-logo.png" alt="" />
                  <h3>Codebase Data</h3>
                </div>

                <div className="data-box">
                  <img className="icon" src="images/wp-engine-logo-75.png" alt="" />
                  <h3>WPEngine</h3>
                </div>

                <div className="data-box">
                  <img className="icon" src="images/cloudflare-logo.png" alt="" />
                  <h3>Cloudflare & DNS Info</h3>
                  <p><span>Name:</span> {result.name}</p>
                  <p>Original DNS Host: {result.original_dnshost}</p>
                  <p>Cloudflare Nameserver 1: {result.name_servers[0]}</p>
                  <p>Cloudflare Nameserver 2: {result.name_servers[1]}</p>
                </div>
              
              </div>
              

              
            </Collapsible>
          );
        })}
      </div>
    );
  }
}

export default CloudflareZones;