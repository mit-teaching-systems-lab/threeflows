/* @flow weak */
import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import StudentCard from './student_card.jsx';
import ExamplesCard from './examples_card.jsx';
import {questionId} from './questions.js';


/*
This shows the full context of a Message Popup question, for use in scoring
or evaluating responses to it.
*/
export default React.createClass({
  displayName: 'MessagePopUp.ScoringQuestionContext',

  propTypes: {
    question: React.PropTypes.object.isRequired,
    learningObjective: React.PropTypes.object.isRequired,
    indicator: React.PropTypes.object.isRequired
  },

  render() {
    const {question, indicator, learningObjective} = this.props;
    
    return (
      <div>
        <Card
          key="question"
          zDepth={2}
          initiallyExpanded={true}>
          <CardHeader
            title={`Question #${questionId(question)}`}
            actAsExpander={true}
            showExpandableButton={true}/>
          <CardText
            expandable={true}>
              <div>
                <div style={{paddingBottom: 20}}>{question.text}</div>
                {question.students && question.students.map(student => <StudentCard useCardStyles={true} student={student} />)}
              </div>
          </CardText>
        </Card>
        <Card key="learningObjective" zDepth={2}>
          <CardHeader
            title="Learning Objective"
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText
            expandable={true}>{learningObjective.text}</CardText>
        </Card>
        <Card key="indicator" zDepth={2}>
          <CardHeader
            title="Indicator"
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText
            expandable={true}>{indicator.text}</CardText>
        </Card>
        {question.examples.length > 0 &&
          <ExamplesCard
            key="examples"
            titleText="Examples"
            examples={question.examples} />}
        {question.nonExamples.length > 0 &&
          <ExamplesCard
            key="non-examples"
            titleText="Non-examples"
            examples={question.nonExamples} />}
      </div>
    );
  }
});