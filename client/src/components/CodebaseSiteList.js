import React, { Component } from 'react';

// class CodebaseSiteList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       actively_reporting_sites: props.siteData.actively_reporting_sites,
//     }

//     this.handleFilter = this.handleFilter.bind(this);
//   }

//   handleFilter(e) {
//     const searchTerm = e.target.value;
//     const allSites = this.props.siteData.actively_reporting_sites;
//     console.log(allSites);
//     const filteredSites = allSites.filter(site => {site.url.includes(searchTerm)});

//     this.setState({
//       actively_reporting_sites: filteredSites,
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({actively_reporting_sites: nextProps.siteData.actively_reporting_sites})
//   }

//   // componentDidMount(props) {
//   //   this.state = {
//   //     actively_reporting_sites: props.siteData.actively_reporting_sites,
//   //   }
//   // }

//   render() {
//     return (
//       <div className="limiter">
//       <input type="text" name="filter" id="filter" onChange={this.handleFilter} />
//         <table cellSpacing="0">
//           <thead>
//               <tr>
//                 <th>URL</th>
//                 <th>Codebase Version</th>
//                 <th>Child Theme</th>
//                 <th>Child Theme Version</th>
//                 <th>Last Checked</th>
//               </tr>
//           </thead>
//           <tbody>
//           {this.state.actively_reporting_sites.map((site) => {
//           return (
//             <tr key={site.id}>
//               <td>{site.url}</td>
//               <td>{site.cb_v}</td>
//               <td>{site.ds_name}</td>
//               <td>{site.ds_v}</td>
//               <td>{site.last_updated}</td>
//             </tr>
//           )})}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

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
      
      {/* <h2>Not Actively Reporting Sites</h2>

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
      </table> */}
    </div>
  );
}

export default CodebaseSiteList;
