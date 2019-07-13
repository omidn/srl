import React from 'react';
import Paper from '@material-ui/core/Paper';
import SearchField from './components/SearchField';
import ResultsGrid from './components/ResultsGrid';
import { search } from './api';


import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      results: [],
      url: '',
    };

    this.onSearchClicked = this.onSearchClicked.bind(this);
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  async onSearchClicked(q) {
    const results = await search(q);
    console.log('results', results);
    this.setState({ results });
  }

  onResultSelected(result) {
    this.setState({ selectedUrl: result.url });
  }
  
  render () {
    return (
      <div className="wrapper">
        <Paper className="paper queryContainer">
          <SearchField onSearchClicked={this.onSearchClicked} />
          <ResultsGrid results={this.state.results} onResultSelected={this.onResultSelected} />
        </Paper>
        <Paper className="paper">
          <iframe className="preview" src={this.state.selectedUrl} title="previewFrame" />
        </Paper>
      </div>
    );  
  }
}

export default App;
