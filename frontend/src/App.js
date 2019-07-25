import React from 'react';
import Paper from '@material-ui/core/Paper';
import SearchField from './components/SearchField';
import ResultsGrid from './components/ResultsGrid';
import { search, saveLabel } from './api';

import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      results: [],
      selectedUrl: '',
      lastSearchQuery: '',
    };

    this.onSearchClicked = this.onSearchClicked.bind(this);
    this.onResultSelected = this.onResultSelected.bind(this);
    this.setIsRelated = this.setIsRelated.bind(this);
  }

  async onSearchClicked(q) {
    this.setState({ lastSearchQuery: q });
    const results = await search(q);
    this.setState({ results });
  }

  onResultSelected(result) {
    this.setState({ selectedUrl: result.url });
  }

  async setIsRelated(uid, verdict) {
    await saveLabel({
      query: this.state.lastSearchQuery,
      uid,
      verdict,
    });
    
    const { results } = this.state;
    const index = results.findIndex(x => x.uid === uid);

    this.setState({
      results: [
        ...results.slice(0, index),
        {
          ...results[index],
          labeled: true
        },
        ...results.slice(index + 1)
      ]
    });
  }
  
  render () {
    return (
      <div className="wrapper">
        <Paper className="paper queryContainer">
          <SearchField onSearchClicked={this.onSearchClicked} />
          <ResultsGrid results={this.state.results} onResultSelected={this.onResultSelected} setIsRelated={this.setIsRelated} />
        </Paper>
      </div>
    );  
  }
}

export default App;
