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
              <p>{result.name}</p>
              <p>{result.original_dnshost}</p>
              <p>{result.name_servers[0]}</p>
              <p>{result.name_servers[1]}</p>
            </Collapsible>
          );
        })}
      </div>
    );
  }
}

export default CloudflareZones;