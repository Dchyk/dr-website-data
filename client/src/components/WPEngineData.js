import React, { Component } from 'react';
import { WPEngineSiteList } from './WPEngineSiteList';
import { callApi } from '../utils/callApi';

class WPEngineData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WPEngineInstalls: []
    }
  }

  componentDidMount() {
    callApi('/api/wpengine')
    .then(res => this.setState({ WPEngineInstalls: res.results}))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <WPEngineSiteList installs={this.state.WPEngineInstalls} />
    );
  }
}

export default WPEngineData;