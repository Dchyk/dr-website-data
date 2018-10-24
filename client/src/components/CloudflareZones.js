import React, { Component } from 'react';

class CloudflareZones extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div className="limiter">
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Original DNS Host</th>
              <th>CF Nameserver 1</th>
              <th>CF Nameserver 2</th>
            </tr>
          </thead>
          <tbody>
          {this.props.zones.map((result) => {
            return (
              <tr key={result.id}>
                <td>{result.name}</td>
                <td>{result.original_dnshost}</td>
                <td>{result.name_servers[0]}</td>
                <td>{result.name_servers[1]}</td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CloudflareZones;