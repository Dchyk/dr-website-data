import React from 'react';

const CodebaseSiteList = (props) => {
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
        {props.siteData.actively_reporting_sites.map((site) => {
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
      {props.siteData.not_actively_reporting_sites.map((site) => {
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

export default CodebaseSiteList;
