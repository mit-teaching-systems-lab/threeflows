/* @flow weak */
import _ from 'lodash';
import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import SetIntervalMixin from '../helpers/set_interval_mixin.js';
import * as Api from '../helpers/api.js';
import {indicators} from '../data/indicators.js';



export default React.createClass({
  displayName: 'RawPage',
  mixins: [SetIntervalMixin],

  propTypes: {
    refreshIntervalMs: React.PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      refreshIntervalMs: 5000
    };
  },

  getInitialState() {
    return {
      indicators,
      logs: null,
      evaluations: null,
      searchText: ''
    };
  },

  componentDidMount(props, state) {
    this.doReload();
    this.setInterval(this.doReload, this.props.refreshIntervalMs);
  },

  doReload() {
    Api.evidenceQuery().end(this.onDataReceived);
    Api.evaluationsQuery().end(this.onEvaluationsReceived);
  },

  onDataReceived(err, response) {
    const logs = JSON.parse(response.text).rows;
    this.setState({logs});
  },

  onEvaluationsReceived(err, response) {
    const evaluations = JSON.parse(response.text).rows;
    this.setState({evaluations});
  },

  onSearchTextChanged(e) {
    this.setState({ searchText: e.target.value });
  },

  onTapEmail(email) {
    this.setState({ searchText: email });
  },

  filterRaw(items) {
    const {searchText} = this.state;

    return items.filter((item) => {
      return JSON.stringify(item).indexOf(searchText) !== -1;
    });
  },

  render() {
    const {logs, evaluations, indicators} = this.state;
    const isLoaded = logs && evaluations && indicators;

    return (
      <div style={styles.pageContainer}>
        {!isLoaded && <div key="loading">Loading...</div>}
        {isLoaded &&
          <div>
            <div>{this.renderSearch()}</div>
            <div>{this.renderLogs(logs)}</div>
            <div>{this.renderEvaluations(evaluations)}</div>
            <div>{this.renderIndicators(indicators)}</div>
          </div>
        }
      </div>
    );
  },

  renderSearch() {
    const {logs, evaluations} = this.state;
    const emails = _.uniq(_.compact([].concat(
      evaluations.map(evaluation => evaluation.json && evaluation.json.email),
      logs.map(log => log.json && log.json.email)
    )));
    
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Filter" />
        <CardText>
          <div>
            <TextField
              name="searchText"
              onChange={this.onSearchTextChanged}
              value={this.state.searchText}
              fullWidth={true}
              hintText="Search..."
            />
          </div>
          <div>
            <FlatButton
              label="Clear"
              primary={true}
              onTouchTap={this.onTapEmail.bind(this, '')}
            />
            {emails.map(email => {
              return <FlatButton
                key={email}
                label={email}
                onTouchTap={this.onTapEmail.bind(this, email)}
              />;
            })}
          </div>
        </CardText>
      </Card>
    );
  },

  renderLogs(logs) {
    return (
      <Card
        style={{backgroundColor: Colors.amber700}}
        initiallyExpanded={false}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Logs"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.filterRaw(logs).map((log) => {
            return <pre key={log.id} style={styles.line}>{JSON.stringify(log)}</pre>;
          })}
        </CardText>
      </Card>
    );
  },

  renderEvaluations(evaluations) {
    return (
      <Card
        style={{backgroundColor: Colors.lightBlue200}}
        initiallyExpanded={false}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Evaluations"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.filterRaw(evaluations).map((evaluation) => {
            return <pre key={evaluation.id} style={styles.line}>{JSON.stringify(evaluation)}</pre>;
          })}
        </CardText>
      </Card>
    );
  },

  renderIndicators(indicators) {
    return (
      <Card
        style={{backgroundColor: Colors.deepPurple100}}
        initiallyExpanded={false}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Indicators"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.filterRaw(indicators).map((indicator) => {
            return <pre key={indicator.id} style={styles.line}>{JSON.stringify(indicator)}</pre>;
          })}
        </CardText>
      </Card>
    );
  }
});

const styles = {
  cardTitleHeader: {
    fontSize: 24
  },
  pageContainer: {
    padding: 10
  },
  line: {
    padding: 0,
    margin: 0
  }
};