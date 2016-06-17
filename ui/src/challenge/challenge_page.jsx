import React from 'react';
import * as Routes from '../routes';
import * as PropTypes from '../prop_types.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import SideMenu from '../components/side_menu.jsx';
import LearningPlan from './learning_plan.jsx';
import LearningObjectivesTable from './learning_objectives_table.jsx';
import LearningExperiencesGrid from './learning_experiences_grid.jsx';

/*
Challenge page layout
*/
export default React.createClass({
  displayName: 'ChallengePage',

  propTypes: {
    user: PropTypes.User.isRequired,
    challenge: PropTypes.Challenge.isRequired
  },

  getInitialState: function() {
    return {};
  },

  render() {
    const {challenge, user} = this.props;
    return (
      <div style={styles.page}>
        <div style={styles.content}>
          <a style={styles.challengeTitle} href={Routes.challengePath(challenge.id)}>{challenge.name} Challenge</a>
          <div style={styles.section}>{this.renderScenario()}</div>
          <div style={styles.section}>{this.renderSolution()}</div>
          <div style={styles.section}>{this.renderLearningObjectives()}</div>
          <div style={styles.section}>{this.renderLearningExperiences()}</div>
        </div>
      </div>
    );
  },

  renderScenario() {
    const {driveFolderId} = this.props.user;
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Scenario"
          subtitle="The students, classroom and context for this challenge"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <div style={styles.scenario}>{this.props.challenge.scenario}</div>
        </CardText>
        <CardActions expandable={true}>
          <FlatButton
            secondary={true}
            label="Virtual classroom"
            onTouchTap={Routes.newTab.bind(Routes, '/virtual_school')} />
        </CardActions>
      </Card>
    );
  },

  renderSolution() {
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          title="Solution"
          subtitle="When you're ready, show what you've learned"
          titleStyle={styles.cardTitleHeader}
          actAsExpander={true}
          showExpandableButton={true} />
        />
        <CardActions expandable={true}>
          <FlatButton
            label="Lesson Sketch"
            disabled={true}
            secondary={true}
            onTouchTap={Routes.newTab.bind(Routes, 'https://docs.google.com/document/d/1y-F6SdaCLCSMw3GV5pR96MZHcZT2U4aWXXPTnRTd7ts/edit#heading=h.yuqrdnz6q8dr')} />
          <FlatButton
            label="Message PopUp"
            secondary={true}
            linkButton={true}
            href={Routes.messagePopupSolutionPath()} />
        </CardActions>
      </Card>
    );
  },

  renderLearningObjectives() {
    const {learningObjectives} = this.props.challenge;
    return (
      <Card initiallyExpanded={false}>
        <CardHeader
          title="Learning objectives"
          subtitle="The competencies you'll focus on in this challenge"
          titleStyle={styles.cardTitleHeader}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <LearningObjectivesTable learningObjectives={learningObjectives} />
        </CardText>
      </Card>
    );
  },

  renderLearningExperiences() {
    const {learningExperiences} = this.props.challenge;
    return (
      <Card
        initiallyExpanded={true}
        expandable={false}>
        <CardHeader
          title="Learning Experiences"
          subtitle="Learn, practice and reflect"
          titleStyle={styles.cardTitleHeader}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardActions expandable={true}>
          <LearningExperiencesGrid learningExperiences={learningExperiences} />
        </CardActions>
      </Card>
    );
  }
});


const styles = {
  page: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#5481a9',
    padding: 20
  },
  menu: {
    marginLeft: 10,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    paddingRight: 10,
    maxWidth: 800
  },
  challengeTitle: {
    display: 'block',
    fontSize: 36,
    color: 'white'
  },
  section: {
    marginTop: 20,
    marginBottom: 20
  },
  cardTitleHeader: {
    fontSize: 24
  },
  scenario: {
    whiteSpace: 'pre-wrap'
  },
  driveContainer: {
    marginTop: 10,
    border: '1px solid #ccc',
    height: 200
  },
  driveIframe: {
    width:'100%',
    height:'100%',
    border: 0
  }
};