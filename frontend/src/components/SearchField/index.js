import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.css';

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onHandleSearchClick = this.onHandleSearchClick.bind(this);
    this.onHandleQueryChange = this.onHandleQueryChange.bind(this);
  }

  onHandleSearchClick() {
    const { onSearchClicked } = this.props;
    onSearchClicked (this.state.value);
  }

  onHandleQueryChange(e) {
    this.setState({ value: e.target.value });
  }
  
  render () {
    return (
      <div className="header">
        <TextField fullWidth value={this.state.value} onChange={this.onHandleQueryChange} />
        <Button color="primary" onClick={this.onHandleSearchClick}>
          Search
        </Button>
      </div>
    );
  }
}

export default SearchField;
