import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './styles.css';

class ResultsGrid extends React.Component {
  render() {
    const { results, onResultSelected } = this.props;
    
    return (
      <div className="resultsContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Results</TableCell>
              <TableCell align="center">Related?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              results.map(result => (
                <TableRow key={result.url} className="resultRow">
                  <TableCell className="resultContainer" onClick={() => onResultSelected(result)}>
                    <p className="resultTitle">
                      <a href={result.url}>
                        {result.name}
                      </a>
                    </p>
                    <p className="resultSnippet">
                      {result.snippet}
                    </p>
                  </TableCell>
                  <TableCell align="right" className="actionsContainer">
                    <Button size="small" variant="contained" color="primary"> 
                      Yes
                    </Button>
                    <Button size="small" variant="contained" color="secondary">
                      No
                    </Button>
                  </TableCell>
                </TableRow>                
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

ResultsGrid.propTypes = {
  results: PropTypes.array,
}

ResultsGrid.defaultProps = {
  results: [],
}

export default ResultsGrid;
