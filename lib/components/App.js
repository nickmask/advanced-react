import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';

if (typeof window !== 'undefined') {
  window.Perf = Perf;
}

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

class App extends Component {

  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  state = this.props.store.getState();

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }

  componentDidMount() {
    this.subscritionId = this.props.store.subscribe(this.onStoreChange);
    setImmediate(() => {
      Perf.start();
    });
    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);
  }

  componentDidUpdate() {
    this.props.store.unsubscribe(this.subscritionId);
  }

  render() {

    let { articles, searchTerm } = this.state; 
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchTerm)
        || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={this.props.store.setSearchTerm} />
        <ArticleList 
          articles={articles} 
        />
      </div>

    );
  }
}

export default App;
