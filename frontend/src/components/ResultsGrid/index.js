import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './styles.css';

const Saved = (props) => (
  <div {...props}>
    <span className="savedLabel">Saved</span>
  </div>
);

const ActionsCell = ({ setIsRelated, result, ...otherProps }) => result.labeled ? <Saved {...otherProps} /> : (
  <div { ...otherProps }>
    <Button size="small" variant="contained" color="primary" onClick={() => setIsRelated(result.uid, 1)}> 
      Yes
    </Button>
    <Button size="small" variant="contained" onClick={() => setIsRelated(result.uid, 0)}> 
      Not sure!
    </Button>
    <Button size="small" variant="contained" color="secondary" onClick={() => setIsRelated(result.uid, -1)}>
      No
    </Button>
  </div>
);


const ResultsGrid = ({ results, onResultSelected, setIsRelated }) => (
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
            <TableRow key={result.uid} className="resultRow">
              <TableCell className="resultContainer" onClick={() => onResultSelected(result)}>
                <p className="resultTitle">
                  {result.uid}
                </p>
                <p className="resultSnippet">
                  {result.article}
                </p>
              </TableCell>
              <TableCell>
                <ActionsCell className="actionsContainer" setIsRelated={setIsRelated} result={result} />
              </TableCell>
            </TableRow>                
          ))
        }
      </TableBody>
    </Table>
  </div>
);

ResultsGrid.propTypes = {
  results: PropTypes.array,
}

ResultsGrid.defaultProps = {
  results: [],
}

export default ResultsGrid;
