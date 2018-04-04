import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import logo from './logo.svg';
import './ResearcherDataPage.css';
import {hashInto, colorNames} from './Anonymize.js';

import {Table, Column, AutoSizer, SortDirection, SortIndicator, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import 'react-virtualized/styles.css';

// import styles from './ResearcherDataPage.css';

// Substance of analysis
import * as Analyses from './Analyses.js';


/*
Requires local data from database and from S3.
*/

const styles = {
  table: {
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
    margin: 20
  },
  cell: {
    verticalAlign: 'top',
    padding: 10,
    fontSize: 12
  }
};

function getAudioUrl(row) {
  return row.json.audioUrl || (row.json.audioResponse && row.json.audioResponse.audioUrl) || (row.json.uploadedUrl);
}
function rewriteAudioUrl(s3Folder, audioUrl) {
  const slashIndex = audioUrl.lastIndexOf('/');
  const filename = audioUrl.slice(slashIndex + 1);
  return `${s3Folder}${filename}`;
}

function statsGroupedBy(allRows, keyName, keyFn) {
  const rowGroups = _.groupBy(allRows, keyFn);
  return _.map(rowGroups, (rows, keyValue) => {
    const responses = rows.filter(row => row.type === 'on_response_submitted');
    const textModeCount = responses.filter(row => row.json.textResponse).length;
    const moveOnCount = responses.filter(row => !getAudioUrl(row)).length;
    const anticipateCount = responses.filter(row => row.json.question.type === 'Anticipate').length;
    const reflectCount = responses.filter(row => row.json.question.type === 'Reflect').length;

    return {
      [keyName]: keyValue,
      anticipateCount,
      moveOnCount,
      textModeCount,
      totalResponseCount: rows.length,
      reflectCount
    };
  });
}


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



function percentage(statsForSessions, filterFn) {
  return Math.round(100 * (statsForSessions.filter(filterFn).length / statsForSessions.length)) + '%';
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
    const {filter, dataSet} = currentAnalysis;
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
            dataSet={dataSet} 
            location = {this.state.location}
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
    dataSet: {
      db: React.PropTypes.string.isRequired,
      s3: React.PropTypes.string.isRequired
    }
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

    //TODO: Need to decide if user is authorized to access data at location
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

  _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  });

  _getRowHeight ({ index }) {
    return this._getDatum(index).size;
  }

  _headerRenderer({dataKey, sortBy, sortDirection, label}) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  _rowClassName({index}) {
    if (index < 0) {
      return "headerRow";
    } else {
      return index % 2 === 0 ? "evenRow virtualizedRow" : "oddRow virtualizedRow";
    }
  }

  _wrappingCellRenderer = ({cellData, dataKey, parent, rowIndex}) => {
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}>
        <div
          className={"tableColumn"}
          style={{
            whiteSpace: 'normal',
          }}>
          {cellData}
        </div>
      </CellMeasurer>
    );
  };

  onFetched(json) {
    const filtered = this.filter(json);
    this.setState({ json: filtered });
  }

  onError(exception) {
    console.log("error mounting\n", exception);
  }

  render() {
    const {json} = this.state;
    console.log('rendering')
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
    const statsForSessions = statsGroupedBy(allRows, 'sessionId', row => row.json.sessionId);
    console.log(statsForSessions)
    console.log(allRows)

    return (
      <div>
        <h2 style={{margin: 20}}>Events</h2>
        {json && <pre style={{margin: 20}}>{Object.keys(json).map(key => `${key}: ${json[key].rows.length} rows`).join("\n")}</pre>}
        {json && this.renderEventsTableVirtualized(allRows)}
        {json && this.renderEventsTable(json)}
      </div>
    );
  }

  // Summary stats
  renderStats(key, statsForSessions) {
    return (
      <div>
        <table style={styles.table}>
          <tbody>
            {this.renderStatsRow(`Count by "${key}"`, statsForSessions.length)}
            {this.renderStatsRow('Completed all "anticipate" questions', percentage(statsForSessions, stats => stats.anticipateCount >= 3))}
            {this.renderStatsRow('Completed each step of scenario', percentage(statsForSessions, stats => stats.totalResponseCount >= 18))}
            {this.renderStatsRow('Completed all "reflection" questions', percentage(statsForSessions, stats => stats.reflectCount === 3))}
            {this.renderStatsRow('Used on phone in text mode', percentage(statsForSessions, stats => stats.textModeCount > 0))}
            {this.renderStatsRow('Experienced learning as designed', percentage(statsForSessions, (stats) => {
              return (stats.textModeCount === 0 && stats.totalResponseCount >= 18 && stats.reflectCount  >= 3);
            }))}
          </tbody>
        </table>
        {this.renderGenericTable(statsForSessions)}
      </div>
    );
  }

  renderStatsNew(key, statsForSessions) {
    return (
      <div>
        <table style={styles.table}>
          <tbody>
            {this.renderStatsRow(`Number of "${key}"`, statsForSessions.length)}
            {this.renderStatsRow('Completed all "anticipate" questions', percentage(statsForSessions, stats => stats.anticipateCount >= 3))}
            {this.renderStatsRow('Completed each step of scenario', percentage(statsForSessions, stats => stats.totalResponseCount >= 14))}
            {this.renderStatsRow('Completed all "reflection" questions', percentage(statsForSessions, stats => stats.reflectCount === 3))}
            {this.renderStatsRow('Experienced learning as designed', percentage(statsForSessions, (stats) => {
              return (stats.anticipateCount >= 3 && stats.totalResponseCount >= 14 && stats.reflectCount  >= 3);
            }))}
          </tbody>
        </table>
        {this.renderGenericTable(statsForSessions)}
      </div>
    );
  }

  renderStatsRow(text, valueText) {
    return (
      <tr key={text}>
        <td style={styles.cell}>{text}</td>
        <td style={styles.cell}>{valueText}</td>
      </tr>
    );
  }

  renderGenericTable(rows) {
    const fields = Object.keys(rows[0] || {});
    return (
      <table style={styles.table}>
        <thead>
          <tr>{fields.map((field) => <th key={field} style={styles.cell}>{field}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return <tr key={JSON.stringify(row)}>
              {fields.map((field) => {
                return <td key={field} style={styles.cell}>{row[field]}</td>;
              })}
            </tr>;
          })}
        </tbody>
      </table>
    );
  }

  renderHmtcaTable(json) {
    const csvRows = json.evidence.rows.map((row, i) => {
      return {
        id: row.id,
        timestampText: moment(row.timestamp).format('MM/DD/YY  h:mm:ssa'),
        cohortKey:row.json.cohortKey,
        identifier: row.json.identifier,
        sessionIdSlice: row.json.sessionId.slice(0, 6),
        backgroundColor: hashInto(hmtcaRowKey(row), colorNames),
        questionText: row.json.question.text,
        responseText: row.json.responseText,
        raw: row
      };
    });
    const csvKeys = Object.keys(_.first(csvRows));
    const identifierCount = _.uniq(json.evidence.rows.map(row => row.json.identifier)).length;

    return (
      <div>
        <div>Identifier count: {identifierCount}</div>
        <div><button onClick={this.doExport.bind(this, csvRows, csvKeys)}>Export table as CSV</button></div>

        <table style={styles.table}>
          <tbody>
            {csvRows.map((csvRow, i) => {
              return (
                <tr key={csvRow.id}>
                  <td style={styles.cell} title={JSON.stringify(csvRow.raw, null, 2)}>{csvRows.timestampText}</td>
                  <td style={styles.cell}>{csvRow.cohortKey}</td>
                  <td style={styles.cell}>{csvRow.identifier}</td>
                  <td style={styles.cell}>{csvRow.sessionIdSlice}</td>
                  <td
                    style={{backgroundColor: csvRow.backgroundColor}}
                    title={csvRow.identifier}>
                    {csvRow.identifier}
                  </td>
                  <td style={styles.cell}>{csvRow.questionText}</td>
                  <td style={styles.cell}>{csvRow.responseText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // For looking at raw events and sessions.  Hover to reveal more sensitive data.
  renderEventsTable(json) {
    const {analysisKey} = this.props;
    if (analysisKey === 'HMTCA') return this.renderHmtcaTable(json);

    const {s3} = this.props.dataSet;

    return (
      <table style={styles.table}>
        <tbody>
          {json.evidence.rows.map((row, i) => {
            const audioUrl = getAudioUrl(row);
            const emailBackgroundColor = (row.json.email)
              ? hashInto(row.json.email, colorNames)
              : 'white';
            return (
              <tr key={row.id} >
                <td style={styles.cell} title={JSON.stringify(row, null, 2)}>{moment(row.timestamp).format('MM/DD/YY  h:mm:ssa')}</td>
                <td
                  style={{backgroundColor: emailBackgroundColor, ...styles.cell}}>
                  {row.json.email}
                </td>
                <td style={styles.cell}>{row.json.question.text || <div><span>Teacher Moments Scene: </span> <a href={"https://youtu.be/"+row.json.question.youTubeId}>https://youtu.be/{row.json.question.youTubeId}</a></div>}</td>
                <td style={styles.cell}>{row.json.studentName}</td>
                <td style={styles.cell}>{row.json.projectLabel}</td>
                <td style={styles.cell}>{JSON.stringify(row.json.scoreValues, null, 2)}</td>
                <td style={styles.cell}>{row.json.choice}</td>
                <td style={styles.cell}>{JSON.stringify(row.json.textResponse) || row.json.responseText || (audioUrl && <audio controls={true} src={rewriteAudioUrl(s3, audioUrl)} /> )}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderEventsTableVirtualized(json) {
    console.log(json);
    console.log(json[0]);

    const {s3} = this.props.dataSet;

    const disableHeader = false;
    const headerHeight = 20;
    const height = 400;
    const hideIndexRow = false;
    const overscanRowCount = 10;
    const rowHeight = 40;
    const rowCount = json.length;
    const scrollToIndex = undefined;
    const sortBy = 'index';
    const sortDirection = "ASC";
    const sortedList = json;
    const useDynamicRowHeight = true;
    const rowGetter=({index}) => json[index%json.length];

    return (
      <div>
        <AutoSizer disableHeight>
          {({width}) => (
            <Table
              deferredMeasurementCache={this._cache}
              disableHeader={disableHeader}
              headerClassName={"headerColumn"}
              headerHeight={headerHeight}
              height={height}
              noRowsRenderer={this._noRowsRenderer}
              overscanRowCount={overscanRowCount}
              rowClassName={this._rowClassName}
              rowHeight={rowHeight}
              // rowHeight={this._cache.rowHeight}
              // rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
              rowGetter={rowGetter}
              rowCount={rowCount}
              scrollToIndex={scrollToIndex}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}
            >
              <Column 
                dataKey="Timestamp" 
                label="Timestamp"
                disableSort = {false}
                cellDataGetter={({ dataKey , rowData }) => moment(rowData[dataKey]).format('MM/DD/YY  h:mm:ssa')}
                cellRenderer= {this._wrappingCellRenderer}
                headerRenderer={this._headerRenderer}
                width={300} 
              />
              <Column 
                label="Email" 
                dataKey="email" 
                cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey]}
                headerRenderer={this._headerRenderer}
                width={400} 
              />
              <Column
                label="Prompt"
                dataKey="text"
                cellDataGetter={({ dataKey , rowData }) => rowData.json.question.text || <div><span>Teacher Moments Scene: </span> <a href={"https://youtu.be/"+rowData.json.question.youTubeId}>https://youtu.be/{rowData.json.question.youTubeId}</a></div>}
                cellRenderer= {this._wrappingCellRenderer}
                headerRenderer={this._headerRenderer}
                width={width}
              />
              <Column
                label="Response"
                dataKey="responseText"
                cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey] || (getAudioUrl(rowData) && <audio controls={true} src={rewriteAudioUrl(s3, getAudioUrl(rowData))} /> )}
                cellRenderer= {this._wrappingCellRenderer}
                headerRenderer={this._headerRenderer}
                width={width}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
    // <tr key={row.id} >
  }
}


export default ResearcherDataPage;