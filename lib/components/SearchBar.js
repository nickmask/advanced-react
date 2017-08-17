import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends PureComponent {
  state = {
    searchTerm: ''
  }

  doSearch = debounce(() => {
    this.props.doSearch(this.state.searchTerm);
  }, 300)

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.doSearch();
    });
  }
  // this is how you check if something is updating unnessesarily.
  // componentWillUpdate() {
  //   console.log('updating');
  // }

  render() {
    return (
      <input
        type='search'
        placeholder='Enter search term'
        value={this.state.searchTerm}
        onChange={this.handleSearch}
      />
    );
  }
}

export default SearchBar;
