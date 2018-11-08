import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import SearchBar from './components/SearchBar';
import CodebaseSiteList from './components/CodebaseSiteList';
import SiteDataList from './components/SiteDataList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WPEngineData from './components/WPEngineData';
import { callApi } from './utils/callApi';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      codebaseSiteData: {
        actively_reporting_sites: [],
        not_actively_reporting_sites: [],
      },
      WPEngineInstalls: [],
      WPEngineInstalls2: [],
      WPEngineInstalls3: [],
      cloudflareZones: [],
      sortedOrganizedState: {},
    }

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(searchTerm) {
    this.setState({
      searchTerm: searchTerm,
    });
  }

  sortState() {
    let newState = {};
    const NA = 'N/A'
    const regex = /www./;
    const codebaseDefaultFields = {
      codebaseVersion: null,
      dsName: null, 
      dsVersion: null, 
      lastCodebaseReport: null,
    };
    const WPEngineDefaultFields = {
      id: null,
      cname: null,
      installName: null,
      phpVersion: null,
      primaryDomain: null,
    };
    const cloudflareDefaultFields = {
      id: null, 
      zoneName: null,
      originalDNS: null, 
      nameServer1: null,
      nameServer2: null,
    }

    // Translate all the API data in state into a nice JS formatted Object

    // Starting with the Cloudflare, because it is the source of truth for the most complete 
    // listing of all our sites
    this.state.cloudflareZones.forEach(zone => {
      newState[zone.name] = {
        codebase: codebaseDefaultFields,
        WPEngine: WPEngineDefaultFields,
        cloudflareZones: {
          id: zone.id,
          zoneName: zone.name,
          originalDNS: zone.original_dnshost,
          nameServer1: zone.name_servers[0],
          nameServer2: zone.name_servers[1],
        }
      };
    });

    // site.url should match the name keys in the newState Object.
    // If site.url doesn't exist, it means this site is not in Cloudflare and is thus not a live site.
    // In that case, we'll just add null data to a new entry under that site name for later reference.
    this.state.codebaseSiteData.actively_reporting_sites.forEach(site => {
      if (!newState[site.url]) {
        newState[site.url] = {
          codebase: codebaseDefaultFields,
          WPEngine: WPEngineDefaultFields,
          cloudflareZones: cloudflareDefaultFields,
        };
      }

      newState[site.url].codebase = {
        codebaseVersion: site.cb_v,
        dsName: site.ds_name,
        dsVersion: site.ds_v,
        lastCodebaseReport: site.last_updated,
      }
    });

    this.state.WPEngineInstalls.forEach(site => {
      const strippedDomain = site.primary_domain.replace(regex, '');
      
      if (newState[strippedDomain]) {
        newState[strippedDomain].WPEngine = {
          id: site.id,
          cname: site.cname,
          installName: site.name,
          phpVersion: site.php_version,
          primaryDomain: site.primary_domain,
        }
      }
    });

    return newState;
  }

  componentDidMount() {

    callApi('/api/cloudflare')
    .then(res => this.setState({cloudflareZones: res.result}))
    .catch(err => console.log(err));

    // This approach makes 3 requests, passing an offset parameter so that we can get more than 100 
    // results in the response. Using separate containers to hold the result arrays  
    callApi('/api/wpengine/0')
    .then(res => this.setState({WPEngineInstalls: res.results}))
    .catch(err => console.log(err))
    .then(callApi('/api/wpengine/100') 
          .then(res => this.setState({WPEngineInstalls2: res.results}))
          .catch(err => console.log(err))
            .then(callApi('/api/wpengine/200') 
              .then(res => this.setState({WPEngineInstalls3: res.results}))
              .catch(err => console.log(err))
            )
    )
    .catch(err => console.log(err))
    .then(() => {
      const allWPengineInstalls = this.state.WPEngineInstalls.concat(this.state.WPEngineInstalls2, this.state.WPEngineInstalls3);
      this.setState({WPEngineInstalls: allWPengineInstalls});
    });

    callApi('/api/codebase')
    .then(responseData => this.setState({
      codebaseSiteData: {
        actively_reporting_sites: responseData.actively_reporting_sites.map(site => {
          return ({
            cb_v: site.cb_v,
            ds_name: site.ds_name,
            ds_v: site.ds_v,
            id: site.id,
            last_updated: site.last_updated,
            // Remove the protocol from the url, leaving only the domain
            url: site.url.replace(/http[s]?:\/\/(www.)?/i, '')
          });
        }),
        not_actively_reporting_sites: responseData.not_actively_reporting_sites,
      },
    }))
    .catch(error => console.log(error));
  }

  componentDidUpdate() {
    // const sortedOrganizedState = this.sortState();

    // this.setState({sortedOrganizedState: sortedOrganizedState});

    // // console.log(this.sortState());
  }

  render() {

    // Organize the state so it can be passed down as props
    const dashBoardData = this.sortState();
 
    return (
      <div className="App">
        <Header />

        <SearchBar onChange={this.handleFilter} />

        <Tabs>
          <TabList>
            <Tab>All Site Data</Tab>
            <Tab>Codebase Data</Tab>
            
            <Tab>Non-codebase Data</Tab>
            <Tab>WPEngine Data</Tab>
          </TabList>

            <TabPanel>
              <SiteDataList 
                allSiteData={dashBoardData}
                searchTerm={this.state.searchTerm}
              />
            </TabPanel>
          
            <TabPanel>
              <h2>Actively Reporting Sites</h2>
              <CodebaseSiteList 
                siteData={this.state.codebaseSiteData}
                searchTerm={this.state.searchTerm} 
                />
            </TabPanel>

            

            <TabPanel>
              <h2>Non-code base sites - Ads Next Framework, etc.</h2>
            </TabPanel>

            <TabPanel>
              <WPEngineData WPEngineSiteData={this.state.WPEngineInstalls} />
            </TabPanel>
      
        </Tabs>
      </div>
    );
  }
}

export default App;
