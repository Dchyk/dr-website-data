import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Site search" value={this.state.value} onChange={this.handleChange} />
      </form>
    )
  }
}

export default SearchBar;