import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import SiteList from './components/SiteList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WPEngineData from './components/WPEngineData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />

        <Tabs>
          <TabList>
            <Tab>Codebase Data</Tab>
            <Tab>Non-codebase Data</Tab>
            <Tab>WPEngine Data</Tab>
          </TabList>
        
          <TabPanel>
            <h2>Actively Reporting Sites</h2>
            <SiteList />
          </TabPanel>
          <TabPanel>
            <h2>Non-code base sites - Ads Next Framework, etc.</h2>
          </TabPanel>
          <TabPanel>
            <WPEngineData />
          </TabPanel>
      
        </Tabs>
      </div>
    );
  }
}

export default App;
