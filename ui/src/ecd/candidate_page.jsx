/* @flow weak */
import _ from 'lodash';
import React from 'react';
import dateFns from 'date-fns';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';

import * as Routes from '../routes.js';
import * as Api from '../helpers/api.js';
import * as EvaluationConstants from '../helpers/evaluation_constants';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import {indicators} from '../data/indicators.js';

import {candidateEmailFromLog} from '../message_popup/index.js';

/*
A page showing all evaluations against indicators for a particular
candidate.
*/
export default React.createClass({
  displayName: 'CandidatePage',

  propTypes: {
    candidateEmail: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      indicators,
      candidateEvaluations: null
    };
  },

  componentDidMount() {
    Api.evaluationsWithEvidenceQuery().then(this.onDataReceived);
  },

  // Also filters out evaluations without links back to indicators.
  filteredByCandidate(evaluations, candidateEmail) {
    return evaluations.filter(evaluation => {
      if (!evaluation.json.indicator) return false;
      if (candidateEmailFromLog(evaluation.log) !== candidateEmail) return false;
      return true;
    });
  },

  computeGroupedIndicators(candidateEvaluations) {
    const indicatorEvaluationsMap = _.groupBy(candidateEvaluations, (evaluation) => {
      return evaluation.json && evaluation.json.indicator && evaluation.json.indicator.id;
    });
    return _.zipWith(_.toPairs(indicatorEvaluationsMap), ([indicatorId, evaluations]) => {
      const indicator = _.find(indicators, indicator => indicator.id.toString() === indicatorId);
      return {indicator, evaluations};
    });
  },

  onDataReceived(evaluations) {
    const candidateEvaluations = this.filteredByCandidate(evaluations, this.props.candidateEmail);
    this.setState({candidateEvaluations});
  },

  render() {
    const {candidateEmail} = this.props;
    const {candidateEvaluations, indicators} = this.state;
    const isLoaded = candidateEvaluations && indicators;

    return (
      <div>
        <NavigationAppBar
          title="Gradebook for Candidate"
          style={{backgroundColor: Colors.blueGrey500}} />
        <h3 style={{padding: 10}}>{candidateEmail}</h3>
        {!isLoaded && <div key="loading">Loading...</div>}
        {isLoaded &&
          <div>
            <div>{this.renderIndicatorsTable()}</div>
          </div>
        }
      </div>
    );
  },

  renderIndicatorsTable() {
    const {candidateEvaluations} = this.state;
    const groupedIndicators = this.computeGroupedIndicators(candidateEvaluations);

    return (
      <Card
        style={{backgroundColor: Colors.deepPurple100}}
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Indicators"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {groupedIndicators.map(({indicator, evaluations}) => {
            return (
              <div key={indicator.id} style={styles.line}>
                <div style={styles.leftColumn}>{indicator.text}</div>
                <div style={styles.rightColumn}>
                  {evaluations.map(this.renderEvaluation, this)}
                </div>
              </div>
            );
          })}
        </CardText>
      </Card>
    );
  },

  renderEvaluation(evaluation) {
    const evaluationUrl = Routes.messagePopupEvaluationUrl(evaluation.id);
    const dateText = dateFns.format(new Date(evaluation.timestamp), 'M/D');
    const backgroundColor = EvaluationConstants.colorFor(evaluation.json.scoreValue);

    return (
      <a key={evaluation.id} href={evaluationUrl} style={{...styles.evaluationBox, backgroundColor, ...styles.boxLink}}>
        <div title={evaluation.json.scoreComment}>{dateText}</div>
      </a>
    );
  }
});

const styles = {
  cardTitleHeader: {
    fontSize: 24
  },
  line: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'flex-start',
    height: '5em',
    justifyContent: 'flex-start'
  },
  evaluationBox: {
    width: '3em',
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #666'
  },
  boxLink: {
    color: 'black',
    textDecoration: 'none'
  },
  leftColumn: {
    flex: 6,
    display: 'flex'
  },
  rightColumn: {
    flex: 4,
    display: 'flex'
  }
};