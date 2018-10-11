import React, { Component } from 'react';

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codebaseVersion: null,
      childTheme: {
        name: null,
        version: null,
      }
    };
    this.domain = props.domain;
    this.apiRequest = 'https://www.' + this.domain + '/wp-json/dr-api/v1/get_theme?key=SxgIZCwRjewPt7aJas5ckfsstgqqArI5';
  }

  componentWillMount() {
    fetch(this.apiRequest)
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        codebaseVersion: data.codebaseVersion,
        childTheme: {
          name: data.childTheme.name,
          version: data.childTheme.version,
        }
      });
    }).catch((e) => {
      console.log('There was a problem with this API request. Error Description: ', e);
    });
  }

  render() {
    const loading = 'Loading data...';

    return (
      <tr>
        <td>{this.domain}</td>
        <td>{this.state.codebaseVersion || loading}</td>
        <td>{this.state.childTheme.name || loading}</td>
        <td>{this.state.childTheme.version || loading}</td>
      </tr>
    );
  }
}

export default Site;