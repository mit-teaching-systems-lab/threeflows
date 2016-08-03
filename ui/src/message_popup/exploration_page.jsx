import _ from 'lodash';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import d3 from 'd3';
import dc from 'dc';
import crossfilter from 'crossfilter';
import dateFns from 'date-fns';

import * as Api from '../helpers/api.js';
import * as Anonymizer from '../helpers/anonymizer.js';


/*
UI for exploring Message PopUp responses, not used for scoring.
*/
export default React.createClass({
  displayName: 'MessagePopup.ExplorationPage',

  propTypes: {
    query: React.PropTypes.object.isRequired,
    tableLimit: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      tableLimit: 1000
    };
  },

  anonymizer: null,
  chartsMap: {},

  getInitialState() {
    return {
      logs: null
    };
  },

  componentDidMount() {
    this.anonymizer = Anonymizer.create();
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.onResetClicked();
    });

    this.doInjectStyles();
    Api.evidenceQuery().end(this.onDataReceived);
  },

  componentDidUpdate() {
    this.doDraw(this.state.logs);
  },

  // Inject links for DC and for some styles that override
  // the default DC styling
  doInjectStyles() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = 'https://cdnjs.cloudflare.com/ajax/libs/dc/1.7.5/dc.min.css';
    document.head.appendChild(style);

    const inlineStyleNode = document.createElement('style');
    inlineStyleNode.type = 'text/css';
    const styleText = document.createTextNode(`
      .table-responses .dc-table-group td {
        border-bottom: 3px solid #333;
        font-weight: bold;
        padding-top: 20px;
      }

      .table-responses td {
        padding: 6px;
        color: #666;
      }

      svg text {
        stroke: #black;
        fill: black !important;
      }

    `);
    inlineStyleNode.appendChild(styleText);
    document.head.appendChild(inlineStyleNode);
  },

  onDataReceived(err, response) {
    const logs = JSON.parse(response.text).rows;
    this.setState({logs});
  },

  onResetClicked() {
    _.compact(_.values(this.chartsMap)).forEach(chart => {
      chart.filterAll();
      chart.render();
    });
  },

  doDraw(logs) {
    const anonymizer = this.anonymizer;
    const ndx = crossfilter(logs);
    const transitionDuration = 250;

    const typeDim = ndx.dimension(d => d.type);
    this.chartsMap.type = dc.rowChart('.chart-type')
      .dimension(typeDim)
      .group(typeDim.group().reduceSum(() => 1))
      .elasticX(true)
      .width(styles.chart.width)
      .height(styles.chart.height)
      .transitionDuration(transitionDuration)
      .render();

    const helpTypeDim = ndx.dimension(d => d.json.helpType);
    this.chartsMap.helpType = dc.rowChart('.chart-help-type')
      .dimension(helpTypeDim)
      .group(helpTypeDim.group().reduceSum(() => 1))
      .elasticX(true)
      .width(styles.chart.width)
      .height(styles.chart.height)
      .transitionDuration(transitionDuration)
      .render();

    const studentDim = ndx.dimension(d => d.json.question.student && d.json.question.student.name);
    this.chartsMap.student = dc.rowChart('.chart-student')
      .dimension(studentDim)
      .group(studentDim.group().reduceSum(() => 1))
      .elasticX(true)
      .width(styles.chart.width)
      .height(styles.chart.height)
      .transitionDuration(transitionDuration)
      .render();

    const userDim = ndx.dimension(anonymizer.name);
    this.chartsMap.user = dc.rowChart('.chart-name')
      .dimension(userDim)
      .group(userDim.group().reduceSum(() => 1))
      .elasticX(true)
      .width(styles.chart.width)
      .height(styles.chart.height)
      .transitionDuration(transitionDuration)
      .render();

    const latency = d => Math.round(+d.json.elapsedMs/1000);
    const latencyDim = ndx.dimension(latency);
    this.chartsMap.latency = dc.barChart('.chart-elapsed')
      .dimension(latencyDim)
      .group(latencyDim.group().reduceSum(() => 1))
      .x(d3.scale.linear().domain([0,d3.max(logs, latency)]))
      .controlsUseVisibility(true)
      .width(styles.chart.width)
      .height(styles.chart.height)
      .transitionDuration(transitionDuration)
      .render();

    const sessionDim = ndx.dimension(d => d.json.sessionId);
    this.chartsMap.table = dc.dataTable('.table-responses')
      .dimension(sessionDim)
      .group(d => {
        const date = dateFns.format(new Date(d.timestamp), 'dddd MM/DD/YYYY');
        const sessionId = d.json.sessionId.slice(0,6);
        return `${date} - ${anonymizer.name(d)} - session ${sessionId}`;
      })
      .columns([
        (d => dateFns.format(new Date(d.timestamp), 'hh:mm:ssa')),
        (d => `<span style="font-size: 10px;">${d.type}</span>`),
        (d => `${Math.round(d.json.elapsedMs/1000)}s`),
        (d => this.hintHTML(d.json.question.text)),
        (d => this.hintHTML(d.json.finalResponseText || d.json.initialResponseText)),
      ])
      .sortBy(d => d.timestamp)
      .order(d3.descending)
      .size(this.props.tableLimit)
      .width(styles.table.width)
      .height(styles.table.height)
      .transitionDuration(transitionDuration)
      .render();
  },

  hintHTML(text) {
    return ReactDOMServer.renderToString(
      <span style={styles.hint} title={text}>{text}</span>
    );
  },

  render() {
    const {logs} = this.state;
    return (
      <div>
        {logs === null
          ? <div style={styles.message}>'Loading...'</div>
          : this.renderLogs(logs)
        }
      </div>
    );
  },

  renderLogs(logs) {
    return (
      <div>
        <div style={styles.toolbar}>
          <div>Log explorer: {logs.length} entries</div>
          <button onClick={this.onResetClicked}>Reset filters</button>
        </div>
        <div style={styles.container}>
          <div style={styles.tableContainer}>
            <div style={styles.title}>Most recent logs{logs.length > this.props.tableLimit ? ' (truncating)' : null}</div>
            <div style={styles.table}><div className="table-responses"></div></div>
          </div>
          <div style={styles.chartsContainer}>
            {this.renderChart('Scaffolding', 'chart-help-type')}
            {this.renderChart('Log type', 'chart-type')}
            {this.renderChart('User name', 'chart-name')}
            {this.renderChart('Student name', 'chart-student')}
            {this.renderChart('Seconds taken', 'chart-elapsed')}
          </div>
        </div>
      </div>
    );
  },

  renderChart(title, className) {
    return (
      <div style={styles.chartContainer}>
        <div style={styles.title}>{title}</div>
        <div style={styles.chart} className={className}></div>
      </div>
    );
  }
});

const styles = {
  container: {
    display: 'flex',
    border: '1px solid #ccc',
    fontSize: 20
  },
  toolbar: {
    margin: 20,
    padding: 0
  },
  message: {
    padding: 20,
    fontSize: 32
  },
  chartsContainer: {
    margin: 20,
    padding: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  chartContainer: {
    display: 'inline-block'
  },
  chart: {
    width: 400,
    height: 300
  },
  tableContainer: {
    margin: 20,
    padding: 0
  },
  table: {
    fontSize: 14,
    minWidth: 500
  },
  hint: {
    display: 'inline-block',
    borderBottom: '1px dashed #aaa',
    cursor: 'help',
    width: 80,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};