import React, { Component } from 'react';
import Site from './Site';
import { callApi } from '../utils/callApi';

class SiteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      siteData: {
        actively_reporting_sites: [],
        not_actively_reporting_sites: [],
      }   
    }
  }

  componentDidMount() {
    callApi('/api/codebase')
    .then(responseData => this.setState({
      siteData: {
        actively_reporting_sites: responseData.actively_reporting_sites,
        not_actively_reporting_sites: responseData.not_actively_reporting_sites,
      }
    }))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="limiter">
        <table cellSpacing="0">
          <thead>
              <tr>
                <th>URL</th>
                <th>Codebase Version</th>
                <th>Child Theme</th>
                <th>Child Theme Version</th>
                <th>Last Checked</th>
              </tr>
          </thead>
          <tbody>
          {this.state.siteData.actively_reporting_sites.map((site) => {
          return (
            <tr key={site.id}>
              <td>{site.url}</td>
              <td>{site.cb_v}</td>
              <td>{site.ds_name}</td>
              <td>{site.ds_v}</td>
              <td>{site.last_updated}</td>
            </tr>
          )})}
          </tbody>
        </table>
        
        <h2>Not Actively Reporting Sites</h2>

        <table cellSpacing="0">
        <thead>
          <tr>
            <th>URL</th>
            <th>Codebase Version</th>
            <th>Child Theme</th>
            <th>Child Theme Version</th>
            <th>Last Checked</th>
          </tr>
        </thead>
        <tbody>
        {this.state.siteData.not_actively_reporting_sites.map((site) => {
        return (
          <tr key={site.id}>
            <td>{site.url}</td>
            <td>{site.cb_v}</td>
            <td>{site.ds_name}</td>
            <td>{site.ds_v}</td>
            <td>{site.last_updated}</td>
          </tr>
        )})}
        </tbody>
        </table>
      </div>
    );
  }
}

export default SiteList;
