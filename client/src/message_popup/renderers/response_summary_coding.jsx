/* @flow weak */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import VelocityTransitionGroup from "velocity-react/velocity-transition-group";
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import ReadMore from './read_more.jsx';

/*
Component that displays the summary of responses, either audio or text and asks user to label responses from multi-select tagging options
*/
export default class extends React.Component {

  props: {
    responses: Array<Object>,
    onLogMessage: Function,
    questionEl: Function,
  };

  static displayName = 'ResponseSummaryCoding';

  static propTypes = {
    responses: PropTypes.array.isRequired,
    onLogMessage: PropTypes.func.isRequired,
    children: PropTypes.node,
  };



  state = {
    studentSourcedLabels: [],
  }



  // Supports audio and two forms of text response.
  computeSummaryItems = () => {
    const {responses} = this.props;

    return _.compact(responses.map((response) => {
      const questionId = response.question.id;
      const questionText = response.question.text;

      if (response.audioResponse) {
        const audioUrl = response.audioResponse.downloadUrl;
        return {questionId, questionText, audioUrl};
      }

      if (response.textResponse) {
        const {responseText} = response.textResponse;
        return {questionId, questionText, responseText};
      }

      if (response.responseText) {
        const {responseText} = response;
        return {questionId, questionText, responseText};
      }

      return null;
    }));
  };

  getIndexOfQuestionId(questionId, labelCategory) {

    var arr = this.state.studentSourcedLabels;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].questionId === questionId && arr[i].category === labelCategory) {
        return i;
      }    
    }
    return -1;
  }
  getValueByQuestionId (questionId, labelCategory) {
    var retVal = "";
    var arr = this.state.studentSourcedLabels; 
    var labelIndex = this.getIndexOfQuestionId(questionId, labelCategory);

    if (labelIndex > -1) {
      retVal = arr[labelIndex].label ;
    } 

    return retVal;
  }

  handleTextSelectionChange(questionId, labelCategory, event) {   
    var Label = {
      questionId:questionId, 
      category:labelCategory, 
      label:event.target.value, 
    };

    var newStudentSourcedLabels = _.cloneDeep(this.state.studentSourcedLabels);
    var labelIndex = this.getIndexOfQuestionId(questionId, labelCategory);

    if (labelIndex > -1) {
      //update      
      newStudentSourcedLabels[labelIndex] = Label;
    } else {
      //add
      newStudentSourcedLabels = this.state.studentSourcedLabels.concat([Label]);
    }

    this.setState({studentSourcedLabels: newStudentSourcedLabels});
    this.onLogMessageWithQuestionCoding(questionId, 'student_coding', newStudentSourcedLabels);
  }

  handleSelectionChange(questionId, labelCategory, event) {   
    var Label = {
      questionId:questionId, 
      category:labelCategory, 
      label:event.target.textContent, 
    };

    var newStudentSourcedLabels = _.cloneDeep(this.state.studentSourcedLabels);
    var labelIndex = this.getIndexOfQuestionId(questionId, labelCategory);

    if (labelIndex > -1) {
      //update      
      newStudentSourcedLabels[labelIndex] = Label;
    } else {
      //add
      newStudentSourcedLabels = this.state.studentSourcedLabels.concat([Label]);
    }

    this.setState({studentSourcedLabels: newStudentSourcedLabels});
    this.onLogMessageWithQuestionCoding(questionId, 'student_coding', newStudentSourcedLabels);
  }
  // Mixes in question to payload
  onLogMessageWithQuestionCoding = (questionId, type, coding) => {
    this.props.onLogMessage(type, {
      questionId, 
      coding
    });
  };


  render() {
    console.log('test');
    const {children} = this.props;
    const audioSummaryItems = this.computeSummaryItems();

    var mymenuItems = [
      { payload: '1', text: 'Yes' },
      { payload: '2', text: 'No' },
    ];
    
    return (
      <div className="done">
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={true}>
          <div style={styles.doneTitle}>
            <p style={styles.paragraph}>{children || null}</p>
          </div>
          <p style={styles.summaryTitle}>Summary</p>
          <Divider />
          {audioSummaryItems.map((audioSummaryItem, index) => {
            const {audioUrl, questionId, responseText, questionText} = audioSummaryItem;
            return (
              <div key={index} style ={_.merge(styles.instructions, styles.summaryQuestion)}>
                <ReadMore fulltext={questionText} />
                {audioUrl && <audio controls={true} src={audioUrl} />}
                {responseText && <i style={styles.paragraph}>{responseText}</i>}
                <div style={styles.container}>
                  <div style={styles.instructions}>Did you struggle with this response?</div>
                  <SelectField
                    maxHeight={250}
                    floatingLabelText={ 'Struggle' }
                    style={{paddingLeft: 20, width: '70%'}}
                    value={this.getValueByQuestionId(questionId, "Struggle")}
                    onChange={this.handleSelectionChange.bind(this, questionId, "Struggle")}
                  >
                    {mymenuItems.map(x => <MenuItem key={index + '_' + questionId + '_' + x.text} value={x.text} primaryText={x.text} />)}
                  </SelectField>
                  <div style={styles.instructions}>Did you sound confused?</div>
                  <SelectField
                    maxHeight={250}
                    floatingLabelText={ 'Confusion' }
                    style={{paddingLeft: 20, width: '70%'}}
                    value={this.getValueByQuestionId(questionId, "Confused")}
                    onChange={this.handleSelectionChange.bind(this, questionId, "Confused")}
                  >
                    {mymenuItems.map(x => <MenuItem 
                      key={index + '_' + questionId + '_' + x.text} 
                      value={x.text} 
                      primaryText={x.text} 
                    />)}
                  </SelectField>
                  <div style={styles.instructions}>If yes, reference the audio player above and indicate where you sounded confused (e.g., at 0:12-0:15 in the recording)</div>
                  <TextField
                    id={questionId + '_whereConfused'}
                    onChange={this.handleTextSelectionChange.bind(this, questionId, "ConfusedDesc")}
                    style={{paddingLeft: 20, width: '70%'}}>
                  </TextField>
                </div>
                <Divider />
              </div>

            );
          })}
          <div style={styles.container} />
        </VelocityTransitionGroup>
      </div> 
    );
  }
}

const styles = {
  done: {
    padding: 20,
  },
  container: {
    fontSize: 20,
    padding: 0,
    margin:0,
    paddingBottom: 45
  },
  button: {
    marginTop: 20
  },
  doneTitle: {
    padding: 20,
    paddingBottom: 0,
    margin:0,
  },
  instructions: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    display: 'block',
    marginTop: 20,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 5,
    margin: 0,
    fontWeight: 'bold'
  },
  summaryQuestion: {
    whiteSpace: 'pre-wrap',
    fontSize: 16,
    lineHeight: 1.2,
    paddingTop: 20,
    paddingBottom: 10
  }
};