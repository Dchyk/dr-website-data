import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import SearchBar from './components/SearchBar';
import CodebaseSiteList from './components/CodebaseSiteList';
import CloudflareZones from './components/CloudflareZones';
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
      cloudflareZones: [],
    }

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(searchTerm) {
    this.setState({
      searchTerm: searchTerm,
    });
  }

  componentDidMount() {
    callApi('/api/wpengine')
    .then(res => this.setState({WPEngineInstalls: res.results}))
    .catch(err => console.log(err));

    callApi('/api/codebase')
    .then(responseData => this.setState({
      codebaseSiteData: {
        actively_reporting_sites: responseData.actively_reporting_sites,
        not_actively_reporting_sites: responseData.not_actively_reporting_sites,
      },
    }))
    .catch(error => console.log(error));

    callApi('/api/cloudflare')
    .then(res => this.setState({cloudflareZones: res.result}))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header />

        <SearchBar onChange={this.handleFilter} />

        <Tabs>
          <TabList>
            <Tab>Codebase Data</Tab>
            <Tab>Cloudflare Zones</Tab>
            <Tab>Non-codebase Data</Tab>
            <Tab>WPEngine Data</Tab>
          </TabList>
        
          <TabPanel>
            <h2>Actively Reporting Sites</h2>
            <CodebaseSiteList 
              siteData={this.state.codebaseSiteData}
              searchTerm={this.state.searchTerm} 
              />
          </TabPanel>

          <TabPanel>
            <CloudflareZones zones={this.state.cloudflareZones}/>
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
