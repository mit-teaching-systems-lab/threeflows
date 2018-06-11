import React, { Component } from 'react';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Immutable from 'immutable';

import logo from './logo.svg';
import './ResearcherDataPage.css';

import {AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';

import * as Analyses from './Analyses.js';
import DynamicTable from './DynamicTable.js';


/*
Requires local data from database and from S3.
*/

function hmtcaRowKey(row) {
  return [row.json.cohortKey, row.json.identifier, row.json.sessionId].join(" - ");
}

function ctMobileCspRowKey(row) {
  return [row.json.email, row.json.sessionId].join(" - ");
}

function escapedCell(cell) {
  return (cell && cell.replace)
    ? cell.replace(/\n/g, '  ')
    : cell;
}

// Decide what analysis to do
class ResearcherDataPage extends Component {
  constructor(props) {
    super(props);
    const analysisTuple = _.last(_.entries(Analyses));
    const [key, analysis] = analysisTuple;
    this.state = {
      key: key, 
      analysis: analysis,
      location: '/teachermoments/turner?playtest20180124',
      token: this.props.token,
      email: this.props.email
    };
  }

  onAnalysisChanged(e, index, targetAnalysisKey) {
    const analysisTuple = _.find(_.entries(Analyses), pair => pair[0] === targetAnalysisKey);
    const [key, analysis] = analysisTuple;
    this.setState({key, analysis});
  }

  render() {
    const currentKey = this.state.key;
    const currentAnalysis = this.state.analysis;
    const {filter, location} = currentAnalysis;
    return (
      <MuiThemeProvider>
        <div className="ResearcherDataPage">
          <div className="ResearcherDataPage-header">
            <img src={logo} className="ResearcherDataPage-logo" alt="logo" />
            {this.renderSelect(currentKey)}
          </div>
          <Analysis
            key={currentKey}
            analysisKey={currentKey}
            filter={filter}
            location={location} 
            token = {this.state.token}
            email = {this.state.email}/>
        </div>
      </MuiThemeProvider>
    );
  }

  renderSelect(currentKey) {
    return (
      <SelectField
        style={{width: 'auto'}}
        floatingLabelText="Analysis"
        value={currentKey}
        onChange={this.onAnalysisChanged.bind(this)}
      >
        {_.entries(Analyses).map((analysisTuple) => {
          const [key, analysis] = analysisTuple;
          const {description} = analysis;
          return <MenuItem
            key={key}
            value={key}
            primaryText={description} />;
        })}
      </SelectField>
    );
  }
}

class Analysis extends Component {
  propTypes: {
    analysisKey: React.PropTypes.string.isRequired,
    filter: React.PropTypes.func.isRequired,
    location: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      json: null,
      location: this.props.location,
      token: this.props.token,
      email: this.props.email
    };
  }

  componentDidMount() {
    const location = this.state.location;
    const token = this.state.token;

    fetch('/server/research/data', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-location': location,
        'x-teachermoments-token': token,
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(this.onFetched.bind(this))
      .catch(this.onError.bind(this));
  }

  filter(json) {
    const {filter, analysisKey} = this.props;
    const rows = json.evidence.rows.filter(filter);

    // TODO(kr) invert this so caller passes
    // sorting by time, or by participant
    var sortedRows = rows;
    if (analysisKey === 'HMTCA') {
      sortedRows = _.sortBy(rows, hmtcaRowKey);
    } else if (analysisKey === 'CTMobileCSPSmith' || 'CTMobileCSPJayden') {
      sortedRows = _.sortBy(rows, ctMobileCspRowKey);
    } else {
      sortedRows = _.sortBy(rows, 'id');
    }
    return {evidence: {rows: sortedRows}};
  }

  doExport(rows, csvKeys) {
    const headerRow = csvKeys.join("\t");
    const csvRows = rows.map(row => csvKeys.map(csvKey => escapedCell(row[csvKey])).join("\t"));
    const csvString = [headerRow].concat(csvRows).join("\n");
    const a         = document.createElement('a');
    a.href        = 'data:attachment/tsv,' +  encodeURIComponent(csvString);
    a.target      = '_blank';
    a.download    = 'myFile.tsv';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onFetched(json) {
    const filtered = this.filter(json);
    this.setState({ json: filtered });
  }

  onError(exception) {
    console.log("error mounting\n", exception);
  }

  render() {
    const {json} = this.state;
    return (
      <div className="Analysis">
        {(json)
          ? this.renderJson(json)
          : <div style={{padding: 20}}>Loading...</div>}
      </div>
    );
  }

  renderJson(json) {
    const allRows = json.evidence.rows;

    return (
      <div>
        <h2 style={{margin: 20}}>Events</h2>
        {json && <pre style={{margin: 20}}>{Object.keys(json).map(key => `${key}: ${json[key].rows.length} rows`).join("\n")}</pre>}
        {json && this.renderEventsTableVirtualized(allRows)}
      </div>
    );
  }

  renderEventsTableVirtualized(json) {
    const simpleJson = json.map((blob) => {
      blob.email= blob.json.email;
      blob.text= blob.json.question.text;
      blob.youTubeId= blob.json.question.youTubeId;
      blob.responseText= blob.json.responseText;
      return blob;
    });
    return (
      <div>
        <AutoSizer disableHeight>
          {({width}) => (
            <DynamicTable
              width={width}
              list={Immutable.List(simpleJson)}
              token={this.state.token}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}


export default ResearcherDataPage;