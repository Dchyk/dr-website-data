import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import CodebaseSiteList from './components/CodebaseSiteList';
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
      filteredCodebaseSites: {
        actively_reporting_sites: [],
        not_actively_reporting_sites: [],
      },
    }

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(e) {
    const searchTerm = e.target.value;

    // This line is the problem...we need to have state somewhere else in order to be retrieving it!
    const allSites = this.state.codebaseSiteData.actively_reporting_sites;
    const filteredSites = allSites.filter(site => site.url.includes(searchTerm));

    this.setState(previousState => ({
      searchTerm: searchTerm,
      filteredCodebaseSites: {
        actively_reporting_sites: filteredSites,
        not_actively_reporting_sites: previousState.codebaseSiteData.not_actively_reporting_sites,
      }
    }));
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
      filteredCodebaseSites: {
        actively_reporting_sites: responseData.actively_reporting_sites,
        not_actively_reporting_sites: responseData.not_actively_reporting_sites,
      },
    }))
    .catch(error => console.log(error));
  }


  render() {
    console.log(this.state.filteredCodebaseSites)
    return (
      <div className="App">
        <Header />

        <form>
          <input type="text" name="filter" id="filter" placeholder="Search" onChange={this.handleFilter} />
        </form>

        <Tabs>
          <TabList>
            <Tab>Codebase Data</Tab>
            <Tab>Non-codebase Data</Tab>
            <Tab>WPEngine Data</Tab>
          </TabList>
        
          <TabPanel>
            <h2>Actively Reporting Sites</h2>
            <CodebaseSiteList siteData={this.state.filteredCodebaseSites} />
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
